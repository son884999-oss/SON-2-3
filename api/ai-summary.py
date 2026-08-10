import os
import json
from http import HTTPStatus

import openai

OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')


def handler(req):
    if req.method != 'POST':
        return ({'error': 'Method not allowed'}, HTTPStatus.METHOD_NOT_ALLOWED)

    if not OPENAI_API_KEY:
        return ({'error': 'OpenAI API key가 설정되어 있지 않습니다.'}, HTTPStatus.INTERNAL_SERVER_ERROR)

    try:
        body = json.loads(req.body)
        prompt = body.get('prompt', '').strip()
        if not prompt:
            return ({'error': '입력값이 필요합니다.'}, HTTPStatus.BAD_REQUEST)

        openai.api_key = OPENAI_API_KEY
        response = openai.Completion.create(
            model='text-davinci-003',
            prompt=f"DeepCheck 요약을 생성해줘. 입력: {prompt}",
            max_tokens=200,
            temperature=0.7,
        )

        text = response.choices[0].text.strip()
        return ({'result': text}, HTTPStatus.OK)
    except openai.error.OpenAIError as error:
        return ({'error': str(error)}, HTTPStatus.BAD_GATEWAY)
    except Exception as error:
        return ({'error': 'AI 요약 생성 중 오류가 발생했습니다.'}, HTTPStatus.INTERNAL_SERVER_ERROR)
