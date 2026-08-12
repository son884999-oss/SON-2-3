# DeepCheck

DeepCheck는 재무 용어에 익숙하지 않은 사용자가 기업의 수익성, 성장성, 재무 안정성, 현금흐름, 가치 평가와 위험 신호를 빠르게 이해하도록 돕는 기업 분석 웹 서비스입니다. 실제 공시 수치는 금융감독원 OpenDART에서 조회하고, 사용자가 선택한 기업은 Google Gemini API를 통해 요약 해설을 확인할 수 있습니다.

## 배포 주소

- Vercel: https://son-2-3.vercel.app/
- GitHub: https://github.com/son884999-oss/SON-2-3

## 화면과 기능

- 홈: 서비스 설명, 기업 검색, 최근 확인 기업 비교
- 기업분석: 종합 재무 평가, 핵심 지표, AI 분석, 5년 재무 흐름, 재무 건전성, 장기 가치 평가, 위험 신호
- 종목찾기: 점수·저평가·실적·현금흐름·부채·ROE 조건 필터
- 재무 용어사전: PER, PBR, ROE, FCF 등 핵심 용어의 정의·해석 예시·확인 사항 안내
- 관심종목: 저장 상태가 보이는 추가·해제 버튼, 해제 후 되돌리기, 브라우저 `localStorage` 저장
- 반응형 UI: 데스크톱 내비게이션, 모바일 하단 내비게이션, 데이터 표 가로 스크롤

삼성전자, SK하이닉스, NAVER, 현대차, 기아는 빠른 비교용 예시 기업입니다. 검색은 OpenDART 기업 고유번호 목록 전체를 대상으로 하므로 상장사는 종목코드 또는 기업명, 비상장 공시대상 기업은 기업명으로 조회할 수 있습니다. 다만 사업보고서가 없거나 표준 재무 계정을 제공하지 않는 기업은 분석 가능한 수치가 제한될 수 있습니다. DeepCheck는 실시간 시세를 제공하지 않습니다.

## 기술 스택과 구조

- 프론트엔드: HTML, CSS, 순수 JavaScript
- 백엔드: Vercel Python Serverless Functions
- AI: Google Gemini Interactions API
- 재무 데이터: 금융감독원 OpenDART API

```text
.
├─ index.html          # 공통 내비게이션과 앱 진입점
├─ css/style.css       # 디자인 토큰, 레이아웃, 반응형 스타일
├─ js/data.js          # MVP 기업 예시 데이터
├─ js/components.js    # 화면별 HTML 렌더링
├─ js/app.js           # 검색, 이동, API 요청, 상태 처리
├─ api/analyze.py      # Gemini 분석 엔드포인트
├─ api/company.py      # OpenDART 재무정보 엔드포인트
├─ api/search.py       # OpenDART 전체 기업 검색 엔드포인트
├─ SERVICE_PLAN.md     # 서비스 기획서
├─ QUEST_AUDIT.md      # QUEST 요구사항 준수 점검
├─ CODE_GUIDE.md       # 전체 구조도·함수·문법 안내
└─ SUBMISSION_CHECKLIST.md
```

## 사용자 입력에서 결과 출력까지

1. 사용자가 기업명이나 종목코드를 입력합니다.
2. `js/app.js`가 입력을 검사하고 해당 기업 분석 화면을 렌더링합니다.
3. 분석 화면은 `fetch('/api/company?...')`로 공시 데이터를 요청합니다.
4. 사용자가 `다시 분석`을 누르면 회사명이 `fetch('/api/analyze')`의 JSON 본문으로 전달됩니다.
5. Python 서버리스 함수가 서버 환경 변수의 API 키로 외부 API를 호출합니다.
6. JavaScript가 성공 결과를 본문에 반영하고, 오류·지연은 사용자 메시지로 안내합니다.

API 키는 브라우저로 전달하지 않고 서버에서만 읽습니다. 키가 프론트 코드에 있으면 웹사이트 방문자가 개발자 도구로 확인할 수 있기 때문입니다. Google도 Gemini 키를 서버 환경 변수에 보관할 것을 권장합니다.

## 환경 변수

루트에 `.env.local`을 만들되 Git에는 올리지 않습니다.

```env
DART_API_KEY=OpenDART에서_발급받은_인증키
GEMINI_API_KEY=Google_AI_Studio에서_발급받은_API_키
GEMINI_MODEL=gemini-2.5-flash
```

- `DART_API_KEY`: 실제 재무정보 조회에 필요
- `GEMINI_API_KEY`: 실제 AI 분석에 필요
- `GEMINI_MODEL`: 선택 사항이며 미설정 시 `gemini-2.5-flash` 사용

`.env.local`은 `.gitignore`의 `.env*` 규칙으로 제외됩니다. 키가 노출됐다고 의심되면 즉시 폐기·재발급하고, 공개 커밋 기록에서도 제거해야 합니다.

## 로컬 실행

정적 UI만 확인:

```bash
python -m http.server 8000
```

`http://localhost:8000`을 엽니다. 이 방법에서는 Python API가 실행되지 않아 예시 재무 데이터가 표시됩니다.

API까지 확인하려면 Node.js와 Vercel CLI가 필요합니다.

```bash
npx vercel dev
```

처음 실행하면 Vercel 로그인과 프로젝트 연결을 요청할 수 있습니다. 표시된 로컬 주소에서 삼성전자를 검색한 뒤 실제 공시 데이터 안내와 AI 분석 응답을 확인합니다.

## API 명세와 실패 처리

### `POST /api/analyze`

요청:

```json
{ "company": "삼성전자" }
```

성공 응답은 `analysis`를 반환합니다. 빈 입력과 80자 초과 입력은 `400`, 키 미설정은 `503`, 외부 API 오류는 `502`, 지연은 `504`로 안내합니다. 프론트엔드는 25초 후 요청을 중단하고 다시 시도하라는 메시지를 표시하며, 중복 요청 방지를 위해 호출 중 버튼을 비활성화합니다.

### `GET /api/company?stockCode=005930`

최근 사업보고서를 조회해 매출, 영업이익, 순이익, 부채비율, 유동비율, ROE, 영업이익률, FCF를 반환합니다. API 오류 시 화면은 예시 데이터를 유지하고 오류 안내를 표시합니다.

### `GET /api/search?q=기업명`

OpenDART 전체 기업 고유번호 목록에서 기업명 또는 6자리 종목코드를 검색합니다. 결과의 `corpCode`를 `/api/company?corpCode=...`에 전달하면 하드코딩되지 않은 기업도 조회할 수 있습니다.

## Vercel 배포

1. 변경사항을 GitHub에 commit/push합니다.
2. Vercel에서 해당 저장소를 Import합니다.
3. Framework Preset은 `Other`, Output Directory는 비워 둡니다.
4. Vercel 프로젝트의 Environment Variables에 `DART_API_KEY`, `GEMINI_API_KEY`, 선택적으로 `GEMINI_MODEL`을 등록합니다.
5. Deploy 후 발급된 URL에서 메뉴, 검색, 관심종목, OpenDART, AI 분석, 모바일 화면을 확인합니다.
6. 이 README의 배포 주소를 실제 URL로 교체한 뒤 다시 commit/push합니다.

로컬 `.env.local`은 Vercel에 자동 업로드되지 않습니다. 배포 환경 변수는 Vercel 프로젝트 설정에 별도로 등록해야 하며, 변경 후에는 재배포해야 적용됩니다.

## 제출 자료

- 서비스 기획서: [SERVICE_PLAN.md](SERVICE_PLAN.md)
- QUEST 준수 점검: [QUEST_AUDIT.md](QUEST_AUDIT.md)
- 코드 구조·함수·문법 안내서: [CODE_GUIDE.md](CODE_GUIDE.md)
- 제출 및 테스트 체크리스트: [SUBMISSION_CHECKLIST.md](SUBMISSION_CHECKLIST.md)
- 비전공자용 배포 안내서: [BEGINNER_GUIDE.md](BEGINNER_GUIDE.md)
- 필요한 캡처: 데스크톱 홈, 모바일 홈, 실제 AI 응답 화면, AI 코딩 도구 사용 과정

## 주의 사항

DeepCheck는 정보 제공용 학습 프로젝트입니다. 특정 종목의 매수 또는 매도를 권유하지 않으며, API 호출에는 사용량 제한과 비용이 발생할 수 있습니다.
