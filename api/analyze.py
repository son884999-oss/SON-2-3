import json
import os
import urllib.error
import urllib.request
from http.server import BaseHTTPRequestHandler


GEMINI_INTERACTIONS_URL = "https://generativelanguage.googleapis.com/v1beta/interactions"
MAX_COMPANY_LENGTH = 80


def build_prompt(company):
    return (
        "당신은 재무 용어를 처음 접하는 사용자를 돕는 기업 분석 도우미입니다. "
        f"{company}의 재무 상태를 한국어 3~4문장으로 요약하세요. "
        "수익성·성장 지속성·재무안정성·현금 창출력을 중심으로 설명하고, "
        "실시간 주가나 단기 등락을 추정하거나 언급하지 마세요. "
        "확인할 데이터가 부족하면 단정하지 마세요. 매수·매도 권유는 하지 마세요."
    )


def extract_output_text(payload):
    direct_text = payload.get("output_text")
    if isinstance(direct_text, str) and direct_text.strip():
        return direct_text.strip()

    text_blocks = []
    for step in payload.get("steps", []):
        for content_item in step.get("content", []):
            text = content_item.get("text")
            if isinstance(text, str) and text.strip():
                text_blocks.append(text.strip())
            elif isinstance(text, dict) and isinstance(text.get("text"), str):
                text_blocks.append(text["text"].strip())
    if text_blocks:
        return "\n".join(text_blocks)
    return ""


def request_analysis(company, api_key, model):
    payload = json.dumps(
        {
            "model": model,
            "input": build_prompt(company),
            "store": False,
        },
        ensure_ascii=False,
    ).encode("utf-8")
    request = urllib.request.Request(
        GEMINI_INTERACTIONS_URL,
        data=payload,
        headers={
            "x-goog-api-key": api_key,
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=20) as response:
        result = json.loads(response.read().decode("utf-8"))
    return extract_output_text(result)


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers.get("Content-Length", "0"))
            body = json.loads(self.rfile.read(content_length) or b"{}")
        except (ValueError, json.JSONDecodeError):
            return self.send_json(400, {"error": "요청 형식이 올바르지 않습니다."})

        company = str(body.get("company", "")).strip()
        if not company:
            return self.send_json(400, {"error": "기업명을 입력해주세요."})
        if len(company) > MAX_COMPANY_LENGTH:
            return self.send_json(400, {"error": "기업명은 80자 이하로 입력해주세요."})

        api_key = os.environ.get("GEMINI_API_KEY", "").strip()
        if not api_key:
            return self.send_json(
                503,
                {"error": "재무 요약 분석 기능이 아직 설정되지 않았습니다."},
            )

        model = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash").strip()
        try:
            analysis = request_analysis(company, api_key, model)
            if not analysis:
                return self.send_json(
                    502,
                    {"error": "요약 분석 결과가 비어 있습니다. 잠시 후 다시 시도해주세요."},
                )
            self.send_json(200, {"analysis": analysis, "model": model})
        except urllib.error.HTTPError as error:
            if error.code == 429:
                status = 429
                message = "요약 분석 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요."
            elif error.code in {400, 401, 403}:
                status = 502
                message = "요약 분석 서비스 설정을 확인해주세요."
            else:
                status = 502
                message = "요약 분석 서비스 응답을 처리하지 못했습니다."
            self.send_json(status, {"error": message})
        except (urllib.error.URLError, TimeoutError):
            self.send_json(504, {"error": "요약 분석 응답이 지연되고 있습니다. 잠시 후 다시 시도해주세요."})
        except Exception:
            self.send_json(500, {"error": "요약 분석 중 오류가 발생했습니다."})

    def do_GET(self):
        self.send_json(405, {"error": "POST 요청만 지원합니다."})

    def send_json(self, status, body):
        encoded = json.dumps(body, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(encoded)
