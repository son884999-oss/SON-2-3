import io
import json
import os
import urllib.parse
import urllib.request
import zipfile
import xml.etree.ElementTree as ET
from http.server import BaseHTTPRequestHandler


CORP_CODE_URL = "https://opendart.fss.or.kr/api/corpCode.xml"
_companies = None


def load_companies(api_key):
    global _companies
    if _companies is not None:
        return _companies

    url = f"{CORP_CODE_URL}?{urllib.parse.urlencode({'crtfc_key': api_key})}"
    request = urllib.request.Request(url, headers={"User-Agent": "DeepCheck/1.0"})
    with urllib.request.urlopen(request, timeout=20) as response:
        archive = zipfile.ZipFile(io.BytesIO(response.read()))
        xml_data = archive.read("CORPCODE.xml")

    root = ET.fromstring(xml_data)
    _companies = [
        {
            "corpCode": item.findtext("corp_code", "").strip(),
            "name": item.findtext("corp_name", "").strip(),
            "stockCode": item.findtext("stock_code", "").strip(),
            "modifiedAt": item.findtext("modify_date", "").strip(),
        }
        for item in root.findall("list")
    ]
    return _companies


def search_companies(companies, query, limit=12):
    normalized = query.replace(" ", "").lower()

    def rank(company):
        name = company["name"].replace(" ", "").lower()
        stock_code = company["stockCode"]
        if stock_code == normalized or name == normalized:
            return 0
        if name.startswith(normalized):
            return 1
        if normalized in name:
            return 2
        return 9

    matches = [company for company in companies if rank(company) < 9]
    matches.sort(key=lambda company: (rank(company), not bool(company["stockCode"]), company["name"]))
    return matches[:limit]


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            api_key = os.environ.get("DART_API_KEY", "").strip()
            if not api_key:
                return self.send_json(503, {"error": "DART_API_KEY가 설정되지 않았습니다."})

            query_string = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            query = query_string.get("q", [""])[0].strip()
            if len(query) < 2:
                return self.send_json(400, {"error": "기업명은 두 글자 이상 입력해주세요."})
            if len(query) > 80:
                return self.send_json(400, {"error": "검색어는 80자 이하로 입력해주세요."})

            results = search_companies(load_companies(api_key), query)
            self.send_json(200, {"results": results, "count": len(results)})
        except (urllib.error.URLError, TimeoutError, zipfile.BadZipFile, ET.ParseError):
            self.send_json(502, {"error": "OpenDART 기업 목록을 불러오지 못했습니다."})
        except Exception:
            self.send_json(500, {"error": "기업 검색 중 오류가 발생했습니다."})

    def send_json(self, status, body):
        encoded = json.dumps(body, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "s-maxage=86400, stale-while-revalidate=604800")
        self.end_headers()
        self.wfile.write(encoded)
