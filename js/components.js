const searchBox = (id = 'search-input') => `
  <div class="searchbox">
    <input id="${id}" aria-label="기업명 또는 종목코드" placeholder="기업명 또는 6자리 종목코드 입력">
    <button class="primary-btn" id="${id.includes('page') ? 'search-action-page' : 'search-action'}">조회하기</button>
  </div>`;

const watchButton = (id, compact = false) => {
  if (id.startsWith('dart-')) return `<span class="dart-session-note">이번 검색에서 분석</span>`;
  const watched = isWatched(id);
  return `<button class="${compact ? 'text-btn' : 'outline-btn'} watch-action ${watched ? 'is-watched' : ''}" data-watch="${id}" aria-pressed="${watched}">${watched ? '관심종목 해제' : '관심종목 추가'}</button>`;
};

const termButton = term => `<button class="term-link" type="button" data-term="${term}" aria-label="${term} 뜻 보기">${term}<span aria-hidden="true">?</span></button>`;

const applyOfficialTerminology = html => html
  .replaceAll('재무 체력', '재무 건전성')
  .replaceAll('체력 점수', '재무 평가')
  .replaceAll('기업 체력 종합점수', '종합 재무 평가 점수')
  .replaceAll('기업 체력 종합', '종합 재무 평가')
  .replaceAll('해당 체력', '해당 재무 항목')
  .replaceAll('기초 체력', '기초 재무 상태')
  .replaceAll('이익 체력', '이익 창출력')
  .replaceAll('낯선 숫자를 쉬운 말로', '주요 재무지표 안내')
  .replaceAll('뜻만 외우기보다 “무엇을 보여주는지, 어떻게 읽는지, 무엇을 조심할지” 순서로 설명합니다.', '각 지표의 정의, 해석 예시와 확인 사항을 순서대로 제공합니다.')
  .replaceAll('쉽게 말하면', '용어 설명')
  .replaceAll('예를 들면', '해석 예시')
  .replaceAll('함께 볼 것', '확인 사항')
  .replaceAll('쉬운 분석', '요약 분석')
  .replaceAll('용어를 누르면 뜻을 자세히 볼 수 있습니다.', '용어를 선택하면 정의와 해석 기준을 확인할 수 있습니다.')
  .replaceAll('왜 기업은 검색되나요?', '기업 검색 가능 사유')
  .replaceAll('왜 분석은 안 되나요?', '분석 제한 사유')
  .replaceAll('내 기준에 맞는 기업 비교', '조건별 기업 비교')
  .replaceAll('중요하게 보는 조건을 선택하면 관련 기업만 남겨 비교할 수 있습니다.', '분석 조건을 선택하여 해당 기업을 비교할 수 있습니다.')
  .replaceAll('Gemini 분석', '재무 요약 분석')
  .replaceAll('Gemini로 쉬운 분석', '재무 요약 분석')
  .replaceAll('새로 분석하기', '요약 갱신하기');

const companyRow = c => `
  <tr>
    <td><button class="company-link" data-open="${c.id}"><strong>${c.name}</strong><span>${Companies.find(x => x.id === c.id)?.ticker || ''}</span></button></td>
    <td class="numeric score-cell">${c.score}</td>
    <td><span class="state state-${c.status === '우수' ? 'good' : 'normal'}">${c.status}</span></td>
    <td class="numeric">${c.per || '-'}</td>
    <td class="numeric">${c.roe || '-'}</td>
    <td class="row-note">${c.note}</td>
    <td class="row-actions"><div class="row-action-group"><button class="text-btn" data-open="${c.id}">분석 보기</button>${watchButton(c.id, true)}</div></td>
  </tr>`;

const companyTable = results => `
  <p class="table-hint">표를 좌우로 밀어 더 많은 항목을 확인할 수 있습니다.</p>
  <div class="table-wrap">
    <table class="company-table">
      <thead><tr><th>기업</th><th class="numeric">재무 평가</th><th>상태</th><th class="numeric">${termButton('PER')}</th><th class="numeric">${termButton('ROE')}</th><th>핵심 판단</th><th><span class="sr-only">작업</span></th></tr></thead>
      <tbody>${results.map(companyRow).join('')}</tbody>
    </table>
  </div>`;

function renderHomeViewContent() {
  return `<section class="home-intro"><div class="container home-layout"><div class="home-search"><p class="kicker">OpenDART 기업공시 조회</p><h1>기업공시 재무정보 조회</h1><p class="lede">기업명 또는 종목코드를 입력하면 OpenDART 공시를 기준으로 재무정보와 주요 분석 항목을 조회합니다.</p>${searchBox()}<p class="search-scope">상장기업은 기업명 또는 6자리 종목코드, 비상장 공시기업은 기업명으로 검색할 수 있습니다.</p></div><aside class="home-guide" aria-label="조회 결과 안내"><h2>조회 결과 제공 항목</h2><ol><li><strong>이익 창출력</strong><span>수익성과 최근 5년 이익 흐름</span></li><li><strong>재무 건전성</strong><span>부채, 현금흐름과 단기 상환 여력</span></li><li><strong>가치 지속성</strong><span>성장 근거와 앞으로 확인할 위험</span></li></ol><button class="text-btn glossary-entry" data-view="glossary">재무 용어사전 보기 →</button></aside></div></section><section class="home-service-info"><div class="container"><div class="home-info-grid"><section><h2>조회 이용 안내</h2><dl class="lookup-info"><div><dt>검색 대상</dt><dd>OpenDART에 등록된 상장기업 및 공시대상 법인</dd></div><div><dt>입력 방법</dt><dd>기업명 또는 6자리 종목코드</dd></div><div><dt>자료 기준</dt><dd>최근 사업보고서와 연결재무제표 우선</dd></div><div><dt>분석 범위</dt><dd>수익성, 재무 건전성, 현금흐름 및 위험 요인</dd></div></dl></section><section><h2>이용 절차</h2><ol class="lookup-steps"><li><strong>기업 검색</strong><span>기업명 또는 종목코드 입력</span></li><li><strong>공시자료 확인</strong><span>OpenDART 사업보고서 조회</span></li><li><strong>재무분석 조회</strong><span>지표와 해설 결과 확인</span></li></ol></section></div><div class="home-notice"><div><h2>자료 기준 및 유의사항</h2><ul><li>실시간 주가와 등락률은 제공하지 않습니다.</li><li>기업별 공시 여부와 계정 구조에 따라 분석 범위가 달라질 수 있습니다.</li><li>본 서비스는 투자 판단을 위한 매수·매도 의견을 제공하지 않습니다.</li></ul></div><nav aria-label="주요 기능 바로가기"><button class="text-btn" data-view="find">조건별 기업 찾기</button><button class="text-btn" data-view="glossary">재무 용어사전</button><button class="text-btn" data-view="watchlist">관심종목 확인</button></nav></div></div></section><div class="disclaimer">본 정보는 기업의 재무 가치를 이해하기 위한 참고 자료이며 매수·매도를 권유하지 않습니다.</div>`;
}

function renderHomeView() {
  return applyOfficialTerminology(renderHomeViewContent());
}

function renderSearchView() {
  return `<header class="page-header search-header"><div class="container narrow"><p class="kicker">OpenDART 통합검색</p><h1>기업공시 재무분석</h1><p>기업명이나 종목코드를 검색하면 공시 확인부터 이익 흐름과 위험까지 순서대로 설명합니다.</p>${searchBox('search-input-page')}<p class="search-scope">OpenDART 등록 기업 전체를 검색하며, 재무제표 제공 여부에 따라 분석 범위가 달라질 수 있습니다.</p><div class="quick-links"><span>검색 예시</span>${Companies.map(c => `<button class="text-btn" data-company="${c.id}">${c.name}</button>`).join('')}</div></div></header><section class="section compact"><div class="container"><div class="section-head"><div><h2>주요 기업 비교</h2><p>자주 찾는 기업을 같은 기준으로 먼저 비교할 수 있습니다.</p></div><button class="text-btn" data-view="glossary">용어사전 보기 →</button></div>${companyTable(FindResults)}</div></section>`;
}

function renderPresetAnalysisView(c) {
  return `<header class="analysis-header"><div class="container company-heading"><div><p class="kicker">${c.ticker}</p><h1>${c.name}</h1><p class="company-summary">${c.summary}</p><p class="analysis-focus"><strong>분석 초점</strong> 수익성 · 성장 지속성 · 재무 안정성 · 현금 창출력</p></div>${watchButton(c.id)}</div></header><section class="container analysis-layout"><aside class="score-panel"><p class="kicker">기업 체력 종합</p><div class="score-line"><strong>${c.score}</strong><span>/ 100 · ${c.status}</span></div><div class="score-track" aria-label="기업 체력 종합점수 ${c.score}점"><i style="width:${c.score}%"></i></div><p>${c.summary}</p><nav class="section-index" aria-label="분석 목차"><a href="#ai-summary">핵심 요약</a><a href="#financial-trend">이익 흐름</a><a href="#health-check">재무 체력</a><a href="#valuation">가치 평가</a><a href="#risk-check">지속성 위험</a></nav></aside><div class="analysis-content"><section class="metric-section" aria-labelledby="metric-title"><div class="section-title"><div><h2 id="metric-title">기업 가치 핵심 지표</h2><p>점수가 높을수록 해당 체력이 안정적이라는 뜻입니다.</p></div><span>100점 기준</span></div><dl class="metric-list">${c.metrics.map((m, i) => `<div><dt>${m[0]}</dt><dd><strong>${m[1]}</strong><span class="${i === 4 ? 'caution' : 'good'}">${m[2]}</span></dd></div>`).join('')}</dl></section><section class="analysis-section ai-summary" id="ai-summary"><div class="section-title"><div><p class="kicker">Gemini 분석</p><h2>기업의 강점과 지속성</h2></div><button class="outline-btn" id="ai-action" data-company="${c.name}">새로 분석하기</button></div><p class="summary-text" id="ai-text">${c.ai}</p><div class="signal-columns"><div><h3>가치를 지지하는 근거</h3><ul>${c.positive.map(x => `<li>${x}</li>`).join('')}</ul></div><div><h3>지속성을 확인할 부분</h3><ul>${c.warning.map(x => `<li>${x}</li>`).join('')}</ul></div></div></section><section class="analysis-section" id="financial-trend"><div class="section-title"><div><h2>최근 5년 이익 창출 흐름</h2><p>매출과 이익이 꾸준히 이어졌는지 확인합니다. 단위: 조원</p></div><div class="legend"><span><i class="revenue-dot"></i>매출</span><span><i class="operating-dot"></i>영업이익</span><span><i class="net-dot"></i>순이익</span></div></div><div id="trend-chart" class="chart" data-labels='${JSON.stringify(Financials.labels)}' data-revenue='${JSON.stringify(Financials.revenue)}' data-operating='${JSON.stringify(Financials.operating)}' data-net='${JSON.stringify(Financials.net)}'></div><p class="help">2023년 저점 이후 영업이익과 순이익이 회복되는 흐름입니다.</p></section><section class="analysis-section" id="health-check"><div class="section-title"><div><h2>재무 체력</h2><p>용어를 누르면 뜻을 자세히 볼 수 있습니다.</p></div><button class="text-btn" data-view="glossary">전체 용어사전 →</button></div><div class="health-table table-wrap"><table><thead><tr><th>지표</th><th class="numeric">최근 값</th><th>판단</th><th>기업 가치와의 관계</th></tr></thead><tbody>${Health.map(h => `<tr><th>${termButton(h[0])}</th><td class="numeric"><strong>${h[1]}</strong></td><td class="good">${h[2]}</td><td>${h[3]}</td></tr>`).join('')}</tbody></table></div></section><section class="analysis-section" id="valuation"><div class="section-title"><div><h2>장기 가치 평가</h2><p>이익과 순자산 대비 평가 수준을 과거 평균과 비교합니다.</p></div><strong class="caution">평균보다 높음</strong></div><div class="valuation-compare"><dl><div><dt>${termButton('PER')}</dt><dd><span>최근 기준 <strong>18.4배</strong></span><span>5년 평균 <strong>15.2배</strong></span><em>평균보다 21% 높음</em></dd></div><div><dt>${termButton('PBR')}</dt><dd><span>최근 기준 <strong>1.6배</strong></span><span>5년 평균 <strong>1.4배</strong></span><em>평균보다 14% 높음</em></dd></div></dl><p>PER과 PBR은 보조 기준입니다. 이익 성장, 현금흐름과 재무 안정성이 이어지는지를 먼저 확인하세요.</p></div></section><section class="analysis-section" id="risk-check"><div class="section-title"><div><h2>기업 가치의 지속성 위험</h2><p>앞으로 이익과 현금 창출을 약화시킬 수 있는 요인입니다.</p></div></div><div class="risk-list"><article><span class="risk-level caution">중간</span><div><h3>이익 기대 부담</h3><p>현재 평가 수준을 유지하려면 실적 개선이 이어져야 합니다.</p></div></article><article><span class="risk-level caution">중간</span><div><h3>업황 민감도</h3><p>반도체 수요 변화에 따라 실적 변동성이 커질 수 있습니다.</p></div></article><article><span class="risk-level good">낮음</span><div><h3>재무 건전성</h3><p>낮은 부채와 충분한 현금으로 재무구조가 안정적입니다.</p></div></article></div></section><section class="conclusion"><p class="kicker">DeepCheck 결론</p><h2>기초 체력은 안정적</h2><p>단기 시세보다 실적 개선과 현금흐름이 이어지는지를 확인하는 것이 중요합니다.</p></section></div></section><div class="disclaimer">DeepCheck는 기업의 재무 가치와 지속성을 이해하기 위한 정보 서비스이며 매수·매도를 권유하지 않습니다.</div>`;
}

function renderAnalysisViewContent(c) {
  const html = renderPresetAnalysisView(c);
  if (!c.isDartCompany) return html;
  const valuationNotice = `<section class="analysis-section" id="valuation"><div class="section-title"><div><h2>장기 가치 평가</h2><p>OpenDART는 주가를 제공하지 않아 PER·PBR은 표시하지 않습니다.</p></div><strong class="caution">공시 기준</strong></div><p class="help">이익, 현금흐름, 부채와 자본 효율을 중심으로 분석합니다. 시세 데이터가 필요한 가치배수는 임의로 추정하지 않습니다.</p></section>`;
  return html
    .replace(/<section class="analysis-section" id="valuation">[\s\S]*?<\/section>/, valuationNotice)
    .replace('반도체 수요 변화에 따라 실적 변동성이 커질 수 있습니다.', '산업 수요와 비용 변화가 이익과 현금흐름에 미치는 영향을 함께 확인해야 합니다.')
    .replace('낮은 부채와 충분한 현금으로 재무구조가 안정적입니다.', 'OpenDART 공시의 부채비율과 현금흐름을 기준으로 재무 건전성을 확인합니다.');
}

function renderAnalysisView(c) {
  return applyOfficialTerminology(renderAnalysisViewContent(c));
}

function renderUnavailableCompanyViewContent(c, message, reason) {
  return `<header class="analysis-header"><div class="container company-heading"><div><p class="kicker">${c.ticker}</p><h1>${c.name}</h1><p class="company-summary">OpenDART에서 기업은 확인했지만 분석에 필요한 재무제표 수치를 찾지 못했습니다.</p></div></div></header><section class="section compact"><div class="container narrow unavailable-company"><p class="kicker">조회 결과</p><h2>${message}</h2><p>${reason || '최근 사업보고서가 없거나 OpenDART 전체 재무제표 API에서 표준 수치를 제공하지 않는 기업일 수 있습니다.'}</p><dl><div><dt>기업 고유번호</dt><dd>${c.corpCode}</dd></div><div><dt>왜 기업은 검색되나요?</dt><dd>OpenDART 기업 목록에는 상장사뿐 아니라 비상장 공시대상 법인도 포함됩니다.</dd></div><div><dt>왜 분석은 안 되나요?</dt><dd>기업 목록 등록과 기계 판독 가능한 사업보고서 재무제표 제공 여부는 서로 다릅니다.</dd></div></dl><button class="primary-btn" data-view="search">다른 기업 검색하기</button></div></section><div class="disclaimer">재무자료가 없는 기업의 수치를 다른 기업의 예시 데이터로 대신 표시하지 않습니다.</div>`;
}

function renderUnavailableCompanyView(c, message, reason) {
  return applyOfficialTerminology(renderUnavailableCompanyViewContent(c, message, reason));
}

function renderFindViewContent(items = FilterItems, results = FindResults) {
  return `<header class="page-header"><div class="container"><p class="kicker">종목찾기</p><h1>내 기준에 맞는 기업 비교</h1><p>중요하게 보는 조건을 선택하면 관련 기업만 남겨 비교할 수 있습니다.</p></div></header><section class="section compact"><div class="container"><div class="filter-bar" role="group" aria-label="기업 필터">${items.map(f => `<button class="filter-btn ${f[0] === 'all' ? 'active' : ''}" data-filter="${f[0]}">${f[1]}</button>`).join('')}</div><p class="results-summary"><strong>${results.length}개</strong> 기업</p>${companyTable(results)}</div></section>`;
}

function renderFindView(items = FilterItems, results = FindResults) {
  return applyOfficialTerminology(renderFindViewContent(items, results));
}

function renderGlossaryViewContent() {
  const selected = sessionStorage.getItem('deepcheck-glossary-term') || '';
  sessionStorage.removeItem('deepcheck-glossary-term');
  const ordered = [...GlossaryTerms].sort((a, b) => (a.term === selected ? -1 : b.term === selected ? 1 : 0));
  const returnLabels = { analysis: '기업분석', search: '기업검색', find: '종목찾기', watchlist: '관심종목', home: '홈' };
  const returnLabel = returnLabels[glossaryReturnView] || '이전 화면';
  return `<header class="page-header"><div class="container narrow"><p class="kicker">재무 용어사전</p><h1>낯선 숫자를 쉬운 말로</h1><p>뜻만 외우기보다 “무엇을 보여주는지, 어떻게 읽는지, 무엇을 조심할지” 순서로 설명합니다.</p></div></header><div class="glossary-return-bar"><div class="container"><button class="text-btn" type="button" data-view="${glossaryReturnView}">← ${returnLabel}으로 돌아가기</button><span>현재 용어: <strong id="current-glossary-term">${selected || ordered[0].term}</strong></span></div></div><section class="section compact"><div class="container glossary-layout"><nav class="glossary-index" aria-label="용어 목록">${GlossaryTerms.map(item => `<button type="button" data-scroll-term="${item.term}">${item.term}<span>${item.korean}</span></button>`).join('')}</nav><div class="glossary-list">${ordered.map(item => `<article id="term-${item.term}" class="glossary-item ${item.term === selected ? 'is-selected' : ''}"><div><p class="kicker">${item.korean}</p><h2>${item.term}</h2></div><dl><div><dt>쉽게 말하면</dt><dd>${item.plain}</dd></div><div><dt>예를 들면</dt><dd>${item.example}</dd></div><div><dt>함께 볼 것</dt><dd>${item.caution}</dd></div></dl></article>`).join('')}</div></div></section>`;
}

function renderGlossaryView() {
  return applyOfficialTerminology(renderGlossaryViewContent());
}

function renderWatchlistView(list) {
  const results = list.map(id => {
    const c = Companies.find(x => x.id === id);
    return FindResults.find(x => x.id === id) || { id: c.id, name: c.name, score: c.score, status: c.status, per: '-', roe: '-', note: c.summary };
  });
  return `<header class="page-header"><div class="container"><p class="kicker">관심종목</p><h1>저장한 기업 비교</h1><p>해제 버튼은 현재 저장 상태를 명확히 표시하며, 잘못 해제하면 바로 되돌릴 수 있습니다.</p></div></header><section class="section compact"><div class="container">${list.length ? `<p class="results-summary"><strong>${list.length}개</strong> 기업을 저장했습니다.</p>${companyTable(results)}` : `<div class="empty-state"><h2>저장한 기업이 없습니다.</h2><p>기업 분석 화면에서 관심종목을 추가해 보세요.</p><button class="primary-btn" data-view="search">기업 검색하기</button></div>`}</div></section>`;
}
