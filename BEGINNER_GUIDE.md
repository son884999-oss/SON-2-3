# DeepCheck 초보자용 실행·배포 안내서

이 문서는 코딩을 처음 접한 사람도 순서대로 따라 할 수 있도록 작성했습니다. 각 단계가 끝날 때마다 확인 항목을 보고 다음 단계로 넘어가세요.

## 먼저 구조를 이해하기

웹사이트를 작은 식당에 비유하면 다음과 같습니다.

- `index.html`: 손님이 보는 식당의 기본 구조
- `css/style.css`: 식당의 색, 간격, 배치
- `js/`: 주문을 받고 화면을 바꾸는 직원
- `api/`: 외부 서비스에 대신 요청하는 주방
- `.env.local`: 주방만 볼 수 있는 비밀 열쇠 보관함

브라우저에서 Gemini API를 직접 호출하면 방문자가 API 키를 볼 수 있습니다. 그래서 브라우저는 `/api/analyze`에 회사명만 보내고, Python 서버가 비밀 키를 사용해 Gemini를 호출합니다.

## 1단계: 환경 변수 확인

프로젝트 루트의 `.env.local`에 아래 세 줄이 있어야 합니다.

```env
DART_API_KEY=발급받은_DART_키
GEMINI_API_KEY=발급받은_Gemini_키
GEMINI_MODEL=gemini-2.5-flash
```

주의할 점:

- 실제 키를 README나 JavaScript에 붙여 넣지 않습니다.
- `이름 = 값`처럼 등호 주변에 공백을 넣지 않습니다.
- 키를 GitHub에 올리지 않습니다.
- `.env.local` 파일 전체를 화면 캡처하지 않습니다.

확인: 파일 이름이 정확히 `.env.local`이고 세 변수 이름의 철자가 같은지 봅니다.

## 2단계: 정적 화면 실행

VS Code에서 `터미널 → 새 터미널`을 선택하고 다음 명령을 입력합니다.

```powershell
python -m http.server 8000
```

브라우저에서 `http://localhost:8000`을 엽니다.

이 방법은 HTML/CSS/JavaScript 화면만 확인하는 방식입니다. Python API는 실행되지 않으므로 AI 버튼의 실제 Gemini 호출은 테스트할 수 없습니다.

서버를 끄려면 터미널을 클릭한 뒤 `Ctrl + C`를 누릅니다.

확인:

- 홈 화면이 보인다.
- 기업분석, 종목찾기, 관심종목 메뉴가 이동한다.
- 브라우저 창을 좁히면 아래쪽에 모바일 메뉴가 나온다.

## 3단계: Git 변경사항 확인

터미널에서 다음 명령을 입력합니다.

```powershell
git status
```

빨간색 또는 초록색 파일 목록은 고장 메시지가 아니라 변경된 파일 목록입니다.

절대로 `.env.local`이 목록에 올라오면 안 됩니다. 다음 명령으로 제외 여부를 확인할 수 있습니다.

```powershell
git check-ignore .env.local
```

결과로 `.env.local`이 출력되면 Git에서 안전하게 제외된 것입니다.

## 4단계: GitHub 주소 확인

```powershell
git remote -v
```

제출할 저장소가 `SON-2-3`인데 다른 이름이 나온다면 다음처럼 고칩니다.

```powershell
git remote set-url origin https://github.com/son884999-oss/SON-2-3.git
```

이 명령은 GitHub 저장소 자체를 지우지 않고, 현재 폴더가 바라보는 주소만 바꿉니다.

## 5단계: GitHub에 올리기

```powershell
git add -A
git commit -m "feat: complete DeepCheck Gemini integration"
git push origin main
```

각 명령의 뜻:

1. `git add -A`: 변경된 파일을 제출 상자에 담기
2. `git commit`: 제출 상자에 이름표 붙이기
3. `git push`: GitHub로 보내기

GitHub 웹사이트에서 파일 목록을 새로고침해 `README.md`, `api/`, `css/`, `js/`가 보이는지 확인합니다. `.env.local`은 보이면 안 됩니다.

## 6단계: Vercel로 배포하기

1. Vercel에 로그인합니다.
2. `Add New` 또는 `New Project`를 누릅니다.
3. GitHub의 `SON-2-3` 저장소를 선택하고 `Import`를 누릅니다.
4. Framework Preset은 `Other`로 선택합니다.
5. Output Directory는 비워 둡니다.
6. 아직 Deploy를 누르기 전에 Environment Variables를 찾습니다.

다음 변수를 하나씩 등록합니다.

```text
DART_API_KEY
GEMINI_API_KEY
GEMINI_MODEL
```

값에는 `.env.local`의 등호 오른쪽 내용만 넣습니다. `GEMINI_MODEL` 값은 `gemini-2.5-flash`입니다.

주의: 환경 변수 이름과 값을 반대로 넣지 않습니다. 키 값은 화면 공유나 캡처에 포함하지 않습니다.

7. `Deploy`를 누릅니다.
8. 완료될 때까지 기다린 뒤 `Visit`을 누릅니다.

## 7단계: 배포된 사이트 테스트

반드시 Vercel 주소에서 다음 순서로 확인합니다.

1. 빈 검색을 실행해 입력 안내가 나오는지 확인합니다.
2. `삼성전자`를 검색합니다.
3. 기업분석 화면 상단에 실제 공시 데이터 안내가 나오는지 확인합니다.
4. `다시 분석`을 누릅니다.
5. 버튼이 `분석 중`으로 바뀌었다가 Gemini가 만든 새 문장으로 교체되는지 확인합니다.
6. 관심종목을 추가하고 관심종목 메뉴에서 보이는지 확인합니다.
7. 종목찾기 필터를 눌러 기업 수가 바뀌는지 확인합니다.
8. 휴대전화나 브라우저 개발자 도구의 모바일 화면으로 다시 확인합니다.

## 8단계: 오류가 날 때 확인 순서

### `AI 분석 기능이 아직 설정되지 않았습니다`

Vercel에 `GEMINI_API_KEY`가 등록되지 않았거나 철자가 다릅니다. 환경 변수를 고친 후 새로 배포합니다.

### `Gemini API 키 또는 모델 설정을 확인해주세요`

- 키 앞뒤에 공백이 없는지 확인합니다.
- `GEMINI_MODEL=gemini-2.5-flash`인지 확인합니다.
- Google AI Studio에서 키가 활성 상태인지 확인합니다.

### `요청 한도를 초과했습니다`

무료 사용량 또는 호출 제한에 도달한 것입니다. 잠시 기다린 뒤 한 번만 다시 시도하고 Google AI Studio 사용량을 확인합니다.

### 공시 데이터 대신 예시 데이터가 나옴

`DART_API_KEY`를 확인합니다. OpenDART 키가 새로 발급됐다면 활성화까지 시간이 필요할 수 있습니다.

### Vercel 환경 변수를 바꿨는데 그대로임

환경 변수 변경은 이미 끝난 배포에 자동 반영되지 않을 수 있습니다. Vercel의 Deployments에서 Redeploy를 실행합니다.

## 9단계: README에 실제 주소 넣기

배포가 성공하면 `README.md`의 다음 부분을 수정합니다.

```text
- Vercel: 실제 배포 주소
- GitHub: 실제 저장소 주소
```

수정 후 다시 GitHub에 올립니다.

```powershell
git add README.md
git commit -m "docs: add deployment links"
git push origin main
```

## 10단계: 제출용 캡처 만들기

다음 네 장면을 준비합니다.

1. 데스크톱 홈 화면
2. 모바일 홈 화면
3. `다시 분석` 후 Gemini 결과가 표시된 화면
4. 이번 Codex 대화에서 구현과 검증 과정이 보이는 화면

캡처 전에 브라우저 탭, 터미널, Vercel 설정 화면에 API 키가 보이지 않는지 확인합니다.

## 마지막 제출 확인

`SUBMISSION_CHECKLIST.md`를 열고 남아 있는 체크박스를 하나씩 확인합니다. 특히 실제 Vercel URL, GitHub URL, 실제 AI 결과 캡처는 계정 소유자가 직접 완료해야 합니다.
