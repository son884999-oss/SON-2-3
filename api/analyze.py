import json
import os
import urllib.request


def handler(request):
    if request.method != 'POST':
        return {
            'statusCode': 405,
            'body': json.dumps({'error': 'Method not allowed'}),
            'headers': {'content-type': 'application/json; charset=utf-8'},
        }

    try:
        body = json.loads(request.body or '{}')
    except Exception:
        body = {}

    company = str(body.get('company', '')).strip()
    if not company:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': '기업명을 입력해주세요.'}, ensure_ascii=False),
            'headers': {'content-type': 'application/json; charset=utf-8'},
        }

    api_key = os.environ.get('OPENAI_API_KEY')
    if not api_key:
        return {
            'statusCode': 200,
            'body': json.dumps({
                'analysis': f'{company}의 수익성, 성장성, 재무안정성과 현재 가격을 함께 살펴보세요. 현금흐름은 안정적이지만 한 가지 지표만으로 판단하기보다 최근 실적 흐름과 위험 신호를 균형 있게 확인하는 것이 좋습니다.',
                'demo': True,
            }, ensure_ascii=False),
            'headers': {'content-type': 'application/json; charset=utf-8'},
        }

    try:
        payload = json.dumps({
            'model': os.environ.get('OPENAI_MODEL', 'gpt-4.1-mini'),
            'input': f'초보 투자자가 이해하기 쉬운 한국어로 {company}의 재무 상태를 3문장으로 요약해줘. 투자 권유는 하지 마.',
        }).encode('utf-8')
        req = urllib.request.Request(
            'https://api.openai.com/v1/responses',
            data=payload,
            headers={
                'Authorization': f'Bearer {api_key}',
                'Content-Type': 'application/json',
            },
        )
        with urllib.request.urlopen(req, timeout=20) as response:
            result = json.loads(response.read().decode('utf-8'))

        text = ''
        if isinstance(result.get('output_text'), str):
            text = result.get('output_text')
        elif isinstance(result.get('output'), list) and result['output']:
            text = result['output'][0].get('content', [{}])[0].get('text', '')

        return {
            'statusCode': 200,
            'body': json.dumps({'analysis': text}, ensure_ascii=False),
            'headers': {'content-type': 'application/json; charset=utf-8'},
        }
    except Exception:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'AI 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'}, ensure_ascii=False),
            'headers': {'content-type': 'application/json; charset=utf-8'},
        }
