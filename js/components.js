const searchBox = (id = 'search-input') => `
  <div class="searchbox">
    <input id="${id}" aria-label="기업명 또는 종목코드" placeholder="기업명 또는 종목코드 (예: 삼성전자, 005930)">
    <button class="primary-btn" id="${id.includes('page') ? 'search-action-page' : 'search-action'}">분석하기</button>
  </div>`;

const watchButton = (id, compact = false) => {
  if (id.startsWith('dart-')) return `<span class="dart-session-note">이번 검색에서 분석</span>`;
  const watched = isWatched(id);
  return `<button class="${compact ? 'text-btn' : 'outline-btn'} watch-action ${watched ? 'is-watched' : ''}" data-watch="${id}" aria-pressed="${watched}">${watched ? '관심종목 해제' : '관심종목 추가'}</button>`;
};

const termButton = term => `<button class="term-link" type="button" data-term="${term}" aria-label="${term} 뜻 보기">${term}<span aria-hidden="true">?</span></button>`;

const companyRow = c => `
  <tr>
    <td><button class="company-link" data-open="${c.id}"><strong>${c.name}</strong><span>${Companies.find(x => x.id === c.id)?.ticker || ''}</span></button></td>
    <td class="numeric score-cell">${c.score}</td>
    <td><span class="state state-${c.status === '우수' ? 'good' : 'normal'}">${c.status}</span></td>
    <td class="numeric">${c.per || '-'}</td>
    <td class="numeric">${c.roe || '-'}</td>
    <td class="row-note">${c.note}</td>
    <td class="row-actions"><button class="text-btn" data-open="${c.id}">분석 보기</button>${watchButton(c.id, true)}</td>
  </tr>`;

const companyTable = results => `
  <p class="table-hint">표를 좌우로 밀어 더 많은 항목을 확인할 수 있습니다.</p>
  <div class="table-wrap">
    <table class="company-table">
      <thead><tr><th>기업</th><th class="numeric">체력 점수</th><th>상태</th><th class="numeric">${termButton('PER')}</th><th class="numeric">${termButton('ROE')}</th><th>핵심 판단</th><th><span class="sr-only">작업</span></th></tr></thead>
      <tbody>${results.map(companyRow).join('')}</tbody>
    </table>
  </div>`;

function renderHomeView() {
  return `<section class="home-intro"><div class="container home-layout"><div><p class="kicker">기업 재무 분석</p><h1>숫자보다 먼저,<br>기업의 체력을 확인하세요.</h1><p class="lede">수익성, 성장 지속성, 재무 안정성과 현금흐름을 쉬운 설명과 함께 비교합니다.</p>${searchBox()}<div class="quick-links"><span>바로 분석</span>${Companies.map(c => `<button class="text-btn" data-company="${c.id}">${c.name}</button>`).join('')}</div></div><aside class="home-guide" aria-label="분석 항목"><h2>한 번의 검색으로 확인하는 것</h2><ol><li><strong>돈을 버는 힘</strong><span>수익성과 최근 5년 이익 흐름</span></li><li><strong>사업을 버티는 힘</strong><span>부채, 현금흐름과 단기 상환 여력</span></li><li><strong>가치의 지속성</strong><span>성장 근거와 앞으로 확인할 위험</span></li></ol><button class="text-btn glossary-entry" data-view="glossary">재무 용어부터 알아보기 →</button></aside></div></section><section class="section compact"><div class="container"><div class="section-head"><div><p class="kicker">빠른 비교</p><h2>최근 많이 확인한 기업</h2><p>모르는 용어의 물음표를 누르면 쉬운 설명을 볼 수 있습니다.</p></div><button class="text-btn" data-view="find">조건으로 더 찾기 →</button></div>${companyTable(FindResults.slice(0, 4))}</div></section><div class="disclaimer">본 정보는 기업의 재무 가치를 이해하기 위한 참고 자료이며 매수·매도를 권유하지 않습니다.</div>`;
}

function renderSearchView() {
  return `<header class="page-header"><div class="container narrow"><p class="kicker">기업분석</p><h1>어떤 기업이 궁금한가요?</h1><p>기업명이나 종목코드를 검색하면 체력 점수부터 이익 흐름과 위험까지 순서대로 설명합니다.</p>${searchBox('search-input-page')}<div class="quick-links"><span>검색 예시</span>${Companies.map(c => `<button class="text-btn" data-company="${c.id}">${c.name}</button>`).join('')}</div></div></header><section class="section compact"><div class="container"><div class="section-head"><div><h2>분석 가능한 기업</h2><p>${FindResults.length}개 기업을 같은 기준으로 비교할 수 있습니다.</p></div><button class="text-btn" data-view="glossary">용어사전 보기 →</button></div>${companyTable(FindResults)}</div></section>`;
}

function renderPresetAnalysisView(c) {
  return `<header class="analysis-header"><div class="container company-heading"><div><p class="kicker">${c.ticker}</p><h1>${c.name}</h1><p class="company-summary">${c.summary}</p><p class="analysis-focus"><strong>분석 초점</strong> 수익성 · 성장 지속성 · 재무 안정성 · 현금 창출력</p></div>${watchButton(c.id)}</div></header><section class="container analysis-layout"><aside class="score-panel"><p class="kicker">기업 체력 종합</p><div class="score-line"><strong>${c.score}</strong><span>/ 100 · ${c.status}</span></div><div class="score-track" aria-label="기업 체력 종합점수 ${c.score}점"><i style="width:${c.score}%"></i></div><p>${c.summary}</p><nav class="section-index" aria-label="분석 목차"><a href="#ai-summary">핵심 요약</a><a href="#financial-trend">이익 흐름</a><a href="#health-check">재무 체력</a><a href="#valuation">가치 평가</a><a href="#risk-check">지속성 위험</a></nav></aside><div class="analysis-content"><section class="metric-section" aria-labelledby="metric-title"><div class="section-title"><div><h2 id="metric-title">기업 가치 핵심 지표</h2><p>점수가 높을수록 해당 체력이 안정적이라는 뜻입니다.</p></div><span>100점 기준</span></div><dl class="metric-list">${c.metrics.map((m, i) => `<div><dt>${m[0]}</dt><dd><strong>${m[1]}</strong><span class="${i === 4 ? 'caution' : 'good'}">${m[2]}</span></dd></div>`).join('')}</dl></section><section class="analysis-section ai-summary" id="ai-summary"><div class="section-title"><div><p class="kicker">Gemini 분석</p><h2>기업의 강점과 지속성</h2></div><button class="outline-btn" id="ai-action" data-company="${c.name}">새로 분석하기</button></div><p class="summary-text" id="ai-text">${c.ai}</p><div class="signal-columns"><div><h3>가치를 지지하는 근거</h3><ul>${c.positive.map(x => `<li>${x}</li>`).join('')}</ul></div><div><h3>지속성을 확인할 부분</h3><ul>${c.warning.map(x => `<li>${x}</li>`).join('')}</ul></div></div></section><section class="analysis-section" id="financial-trend"><div class="section-title"><div><h2>최근 5년 이익 창출 흐름</h2><p>매출과 이익이 꾸준히 이어졌는지 확인합니다. 단위: 조원</p></div><div class="legend"><span><i class="revenue-dot"></i>매출</span><span><i class="operating-dot"></i>영업이익</span><span><i class="net-dot"></i>순이익</span></div></div><div id="trend-chart" class="chart" data-labels='${JSON.stringify(Financials.labels)}' data-revenue='${JSON.stringify(Financials.revenue)}' data-operating='${JSON.stringify(Financials.operating)}' data-net='${JSON.stringify(Financials.net)}'></div><p class="help">2023년 저점 이후 영업이익과 순이익이 회복되는 흐름입니다.</p></section><section class="analysis-section" id="health-check"><div class="section-title"><div><h2>재무 체력</h2><p>용어를 누르면 뜻을 자세히 볼 수 있습니다.</p></div><button class="text-btn" data-view="glossary">전체 용어사전 →</button></div><div class="health-table table-wrap"><table><thead><tr><th>지표</th><th class="numeric">최근 값</th><th>판단</th><th>기업 가치와의 관계</th></tr></thead><tbody>${Health.map(h => `<tr><th>${termButton(h[0])}</th><td class="numeric"><strong>${h[1]}</strong></td><td class="good">${h[2]}</td><td>${h[3]}</td></tr>`).join('')}</tbody></table></div></section><section class="analysis-section" id="valuation"><div class="section-title"><div><h2>장기 가치 평가</h2><p>이익과 순자산 대비 평가 수준을 과거 평균과 비교합니다.</p></div><strong class="caution">평균보다 높음</strong></div><div class="valuation-compare"><dl><div><dt>${termButton('PER')}</dt><dd><span>최근 기준 <strong>18.4배</strong></span><span>5년 평균 <strong>15.2배</strong></span><em>평균보다 21% 높음</em></dd></div><div><dt>${termButton('PBR')}</dt><dd><span>최근 기준 <strong>1.6배</strong></span><span>5년 평균 <strong>1.4배</strong></span><em>평균보다 14% 높음</em></dd></div></dl><p>PER과 PBR은 보조 기준입니다. 이익 성장, 현금흐름과 재무 안정성이 이어지는지를 먼저 확인하세요.</p></div></section><section class="analysis-section" id="risk-check"><div class="section-title"><div><h2>기업 가치의 지속성 위험</h2><p>앞으로 이익과 현금 창출을 약화시킬 수 있는 요인입니다.</p></div></div><div class="risk-list"><article><span class="risk-level caution">중간</span><div><h3>이익 기대 부담</h3><p>현재 평가 수준을 유지하려면 실적 개선이 이어져야 합니다.</p></div></article><article><span class="risk-level caution">중간</span><div><h3>업황 민감도</h3><p>반도체 수요 변화에 따라 실적 변동성이 커질 수 있습니다.</p></div></article><article><span class="risk-level good">낮음</span><div><h3>재무 건전성</h3><p>낮은 부채와 충분한 현금으로 재무구조가 안정적입니다.</p></div></article></div></section><section class="conclusion"><p class="kicker">DeepCheck 결론</p><h2>기초 체력은 안정적</h2><p>단기 시세보다 실적 개선과 현금흐름이 이어지는지를 확인하는 것이 중요합니다.</p></section></div></section><div class="disclaimer">DeepCheck는 기업의 재무 가치와 지속성을 이해하기 위한 정보 서비스이며 매수·매도를 권유하지 않습니다.</div>`;
}

function renderAnalysisView(c) {
  const html = renderPresetAnalysisView(c);
  if (!c.isDartCompany) return html;
  const valuationNotice = `<section class="analysis-section" id="valuation"><div class="section-title"><div><h2>장기 가치 평가</h2><p>OpenDART는 주가를 제공하지 않아 PER·PBR은 표시하지 않습니다.</p></div><strong class="caution">공시 기준</strong></div><p class="help">이익, 현금흐름, 부채와 자본 효율을 중심으로 분석합니다. 시세 데이터가 필요한 가치배수는 임의로 추정하지 않습니다.</p></section>`;
  return html
    .replace(/<section class="analysis-section" id="valuation">[\s\S]*?<\/section>/, valuationNotice)
    .replace('반도체 수요 변화에 따라 실적 변동성이 커질 수 있습니다.', '산업 수요와 비용 변화가 이익과 현금흐름에 미치는 영향을 함께 확인해야 합니다.')
    .replace('낮은 부채와 충분한 현금으로 재무구조가 안정적입니다.', 'OpenDART 공시의 부채비율과 현금흐름을 기준으로 재무 건전성을 확인합니다.');
}

function renderFindView(items = FilterItems, results = FindResults) {
  return `<header class="page-header"><div class="container"><p class="kicker">종목찾기</p><h1>내 기준에 맞는 기업 비교</h1><p>중요하게 보는 조건을 선택하면 관련 기업만 남겨 비교할 수 있습니다.</p></div></header><section class="section compact"><div class="container"><div class="filter-bar" role="group" aria-label="기업 필터">${items.map(f => `<button class="filter-btn ${f[0] === 'all' ? 'active' : ''}" data-filter="${f[0]}">${f[1]}</button>`).join('')}</div><p class="results-summary"><strong>${results.length}개</strong> 기업</p>${companyTable(results)}</div></section>`;
}

function renderGlossaryView() {
  const selected = sessionStorage.getItem('deepcheck-glossary-term') || '';
  sessionStorage.removeItem('deepcheck-glossary-term');
  const ordered = [...GlossaryTerms].sort((a, b) => (a.term === selected ? -1 : b.term === selected ? 1 : 0));
  return `<header class="page-header"><div class="container narrow"><p class="kicker">재무 용어사전</p><h1>낯선 숫자를 쉬운 말로</h1><p>뜻만 외우기보다 “무엇을 보여주는지, 어떻게 읽는지, 무엇을 조심할지” 순서로 설명합니다.</p></div></header><section class="section compact"><div class="container glossary-layout"><nav class="glossary-index" aria-label="용어 목록">${GlossaryTerms.map(item => `<button type="button" data-scroll-term="${item.term}">${item.term}<span>${item.korean}</span></button>`).join('')}</nav><div class="glossary-list">${ordered.map(item => `<article id="term-${item.term}" class="glossary-item ${item.term === selected ? 'is-selected' : ''}"><div><p class="kicker">${item.korean}</p><h2>${item.term}</h2></div><dl><div><dt>쉽게 말하면</dt><dd>${item.plain}</dd></div><div><dt>예를 들면</dt><dd>${item.example}</dd></div><div><dt>함께 볼 것</dt><dd>${item.caution}</dd></div></dl></article>`).join('')}</div></div></section>`;
}

function renderWatchlistView(list) {
  const results = list.map(id => {
    const c = Companies.find(x => x.id === id);
    return FindResults.find(x => x.id === id) || { id: c.id, name: c.name, score: c.score, status: c.status, per: '-', roe: '-', note: c.summary };
  });
  return `<header class="page-header"><div class="container"><p class="kicker">관심종목</p><h1>저장한 기업 비교</h1><p>해제 버튼은 현재 저장 상태를 명확히 표시하며, 잘못 해제하면 바로 되돌릴 수 있습니다.</p></div></header><section class="section compact"><div class="container">${list.length ? `<p class="results-summary"><strong>${list.length}개</strong> 기업을 저장했습니다.</p>${companyTable(results)}` : `<div class="empty-state"><h2>저장한 기업이 없습니다.</h2><p>기업 분석 화면에서 관심종목을 추가해 보세요.</p><button class="primary-btn" data-view="search">기업 검색하기</button></div>`}</div></section>`;
}
