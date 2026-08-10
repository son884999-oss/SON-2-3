import json
import os
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler


COMPANIES = {
    "005930": {"name": "삼성전자", "corp_code": "00126380"},
    "000660": {"name": "SK하이닉스", "corp_code": "00164779"},
    "035420": {"name": "NAVER", "corp_code": "00266961"},
    "005380": {"name": "현대차", "corp_code": "00164742"},
    "000270": {"name": "기아", "corp_code": "00106641"},
}


def number(value):
    try:
        return int(str(value or "0").replace(",", "").strip())
    except (TypeError, ValueError):
        return 0


def find_account(rows, names, statement=None):
    for row in rows:
        if statement and row.get("sj_div") not in statement:
            continue
        name = str(row.get("account_nm", "")).replace(" ", "")
        if name in names:
            return number(row.get("thstrm_amount"))
    return 0


def extract_financials(rows):
    revenue = find_account(
        rows,
        {"매출액", "수익(매출액)", "영업수익", "매출"},
        {"IS", "CIS"},
    )
    operating_profit = find_account(
        rows, {"영업이익", "영업이익(손실)"}, {"IS", "CIS"}
    )
    net_income = find_account(
        rows,
        {"당기순이익", "당기순이익(손실)", "연결당기순이익"},
        {"IS", "CIS"},
    )
    assets = find_account(rows, {"자산총계"}, {"BS"})
    liabilities = find_account(rows, {"부채총계"}, {"BS"})
    equity = find_account(rows, {"자본총계"}, {"BS"})
    current_assets = find_account(rows, {"유동자산"}, {"BS"})
    current_liabilities = find_account(rows, {"유동부채"}, {"BS"})
    operating_cash = find_account(
        rows,
        {"영업활동현금흐름", "영업활동으로인한현금흐름"},
        {"CF"},
    )
    capex = 0
    for row in rows:
        if row.get("sj_div") != "CF":
            continue
        name = str(row.get("account_nm", "")).replace(" ", "")
        if name in {"유형자산의취득", "무형자산의취득"}:
            capex += abs(number(row.get("thstrm_amount")))

    return {
        "revenue": revenue,
        "operatingProfit": operating_profit,
        "netIncome": net_income,
        "assets": assets,
        "liabilities": liabilities,
        "equity": equity,
        "currentAssets": current_assets,
        "currentLiabilities": current_liabilities,
        "operatingCashFlow": operating_cash,
        "freeCashFlow": operating_cash - capex if operating_cash else 0,
    }


def ratio(numerator, denominator):
    return round(numerator / denominator * 100, 1) if denominator else None


def fetch_year(api_key, corp_code, year):
    query = urllib.parse.urlencode(
        {
            "crtfc_key": api_key,
            "corp_code": corp_code,
            "bsns_year": str(year),
            "reprt_code": "11011",
            "fs_div": "CFS",
        }
    )
    request = urllib.request.Request(
        f"https://opendart.fss.or.kr/api/fnlttSinglAcntAll.json?{query}",
        headers={"User-Agent": "DeepCheck/1.0"},
    )
    with urllib.request.urlopen(request, timeout=15) as response:
        payload = json.loads(response.read().decode("utf-8"))
    if payload.get("status") == "013":
        return None
    if payload.get("status") != "000":
        raise ValueError(payload.get("message", "OpenDART 응답 오류"))
    return extract_financials(payload.get("list", []))


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            api_key = os.environ.get("DART_API_KEY", "").strip()
            if not api_key:
                return self.send_json(500, {"error": "DART_API_KEY가 설정되지 않았습니다."})

            query = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            stock_code = query.get("stockCode", [""])[0].strip()
            company = COMPANIES.get(stock_code)
            if not stock_code:
                return self.send_json(400, {"error": "종목코드를 입력해주세요."})
            if not company:
                return self.send_json(404, {"error": "아직 지원하지 않는 종목입니다."})

            current_year = datetime.now(timezone.utc).year
            history = []
            for year in range(current_year - 5, current_year):
                data = fetch_year(api_key, company["corp_code"], year)
                if data and data.get("revenue"):
                    history.append({"year": year, **data})

            if not history:
                return self.send_json(404, {"error": "조회 가능한 사업보고서가 없습니다."})

            latest = history[-1]
            indicators = {
                "debtRatio": ratio(latest["liabilities"], latest["equity"]),
                "currentRatio": ratio(
                    latest["currentAssets"], latest["currentLiabilities"]
                ),
                "roe": ratio(latest["netIncome"], latest["equity"]),
                "operatingMargin": ratio(
                    latest["operatingProfit"], latest["revenue"]
                ),
                "freeCashFlow": latest["freeCashFlow"],
            }
            self.send_json(
                200,
                {
                    "company": company["name"],
                    "stockCode": stock_code,
                    "source": "금융감독원 OpenDART 연결재무제표",
                    "latestYear": latest["year"],
                    "updatedAt": datetime.now(timezone.utc).isoformat(),
                    "indicators": indicators,
                    "history": history,
                },
            )
        except Exception as error:
            self.send_json(502, {"error": f"OpenDART 조회 실패: {str(error)}"})

    def send_json(self, status, body):
        encoded = json.dumps(body, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "s-maxage=21600, stale-while-revalidate=86400")
        self.end_headers()
        self.wfile.write(encoded)
