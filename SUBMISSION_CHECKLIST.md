# 제출 및 테스트 체크리스트

## Codex가 완료한 항목

- [x] 순수 HTML/CSS/JavaScript 프론트 구조
- [x] Python Vercel Serverless Functions 구조
- [x] 홈, 기업분석, 종목찾기, 관심종목 4개 화면
- [x] 데스크톱·모바일 반응형 레이아웃
- [x] 기업 검색과 빈 입력 안내
- [x] 관심종목 저장과 삭제
- [x] OpenDART 공시 데이터 연동 코드
- [x] Google Gemini API 연동 코드
- [x] AI 로딩, 중복 호출 방지, 오류, 요청 과다, 지연 처리
- [x] README의 소개, 기술 스택, 실행·배포 방법, 환경 변수 설명
- [x] 서비스 기획서와 AI 입력·출력·실패 기준
- [x] 미사용 Next.js/React 중복 구현 제거

## 계정 소유자가 해야 하는 항목

- [ ] OpenDART 인증키 발급
- [ ] Google AI Studio에서 Gemini API 키 발급 및 사용 한도 확인
- [ ] GitHub에 변경사항 commit/push
- [ ] Vercel에서 GitHub 저장소 Import
- [ ] Vercel 환경 변수 `DART_API_KEY`, `GEMINI_API_KEY`, 선택적 `GEMINI_MODEL` 등록
- [ ] 실제 배포 후 AI와 OpenDART 응답 확인
- [ ] README에 GitHub URL과 Vercel URL 입력 후 다시 push
- [ ] 데스크톱 홈, 모바일 홈, 실제 AI 응답 화면 캡처
- [ ] 이번 Codex 대화 화면을 AI 코딩 도구 사용 증빙으로 캡처

## 배포 후 기능 테스트

1. 홈에서 빈 검색을 실행하고 필수 입력 메시지가 나타나는지 확인한다.
2. `삼성전자` 또는 `005930`을 검색하고 기업분석 화면으로 이동하는지 확인한다.
3. 분석 상단에 `실제 공시 데이터` 안내가 나타나는지 확인한다.
4. `다시 분석`을 누르고 로딩 상태 이후 실제 AI 문장이 반영되는지 확인한다.
5. 관심종목을 추가하고 관심종목 메뉴에서 목록이 유지되는지 확인한다.
6. 종목찾기에서 `80점 이상`과 다른 필터가 작동하는지 확인한다.
7. 브라우저 폭 390px에서 하단 메뉴 4개와 검색 버튼이 보이는지 확인한다.
8. 모바일 표를 좌우로 스크롤해 점수, PER, ROE를 확인할 수 있는지 확인한다.
9. 개발자 도구 Console에 JavaScript 오류가 없는지 확인한다.
10. 배포 소스와 스크린샷에 API 키가 노출되지 않았는지 확인한다.

## 제출 파일 5종

- [ ] 배포된 웹 서비스 URL
- [ ] GitHub 저장소 URL
- [x] README.md
- [x] SERVICE_PLAN.md
- [ ] 증빙 자료 1세트(데스크톱, 모바일, AI 동작, AI 코딩 도구 사용 과정)
