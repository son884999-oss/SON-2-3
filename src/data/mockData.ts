export type MetricItem = {
  label: string;
  value: number | string;
  status: string;
  comment: string;
};

export type RiskItem = {
  title: string;
  level: string;
  description: string;
};

export type CompetitorItem = {
  name: string;
  score: number;
  per: string;
  roe: string;
  margin: string;
  debt: string;
};

export type Company = {
  id: string;
  name: string;
  ticker: string;
  market: string;
  price: string;
  change: string;
  marketCap: string;
  score: number;
  scoreLabel: string;
  scoreSummary: string;
  metrics: MetricItem[];
  summary: string;
  positives: string[];
  warnings: string[];
  trend: { year: string; revenue: number; operating: number; net: number }[];
  health: { label: string; value: string; status: string; description: string }[];
  valuation: {
    per: string;
    per5y: string;
    pbr: string;
    pbr5y: string;
    sentiment: string;
    explanation: string;
  };
  risks: RiskItem[];
  competitors: CompetitorItem[];
  conclusion: {
    label: string;
    text: string;
  };
  short?: string;
};

export type WatchItem = {
  id: string;
  name: string;
  price: string;
  score: number;
  risk: string;
  trend: string;
};

export type FindItem = {
  id: string;
  name: string;
  score: number;
  status: string;
  per: string;
  roe: string;
  note: string;
};

export type FilterItem = {
  id: string;
  label: string;
};

export const Companies: Company[] = [
  {
    id: 'samsung',
    name: '삼성전자',
    ticker: '005930',
    market: 'KOSPI',
    price: '84,500원',
    change: '+1.32%',
    marketCap: '약 504조원',
    score: 78,
    scoreLabel: '양호',
    scoreSummary: '재무 안정성과 현금흐름은 우수하지만 현재 밸류에이션은 다소 높은 수준입니다.',
    metrics: [
      { label: '수익성', value: 85, status: '우수', comment: '최근 영업이익률이 개선되고 있습니다.' },
      { label: '성장성', value: 72, status: '양호', comment: '매출 성장 흐름이 안정적입니다.' },
      { label: '재무안정성', value: 88, status: '매우 우수', comment: '부채 비율이 낮고 자본 구조가 안정적입니다.' },
      { label: '현금흐름', value: 81, status: '우수', comment: '영업활동 현금흐름이 안정적으로 유지되고 있습니다.' },
      { label: '밸류에이션', value: 61, status: '다소 부담', comment: 'PER/PBR이 과거 평균 대비 다소 높은 편입니다.' },
    ],
    summary: '삼성전자는 안정적인 재무구조와 높은 현금창출력을 보유하고 있습니다. 최근 실적 개선 흐름도 긍정적이지만, 현재 주가 수준에서는 밸류에이션 부담을 함께 확인할 필요가 있습니다.',
    positives: ['영업이익 증가', '현금흐름 개선', '낮은 부채비율'],
    warnings: ['PER이 과거 평균보다 높은 수준', '단기 주가 상승폭 확대'],
    trend: [
      { year: '2021', revenue: 279, operating: 52, net: 39 },
      { year: '2022', revenue: 302, operating: 43, net: 55 },
      { year: '2023', revenue: 259, operating: 7, net: 15 },
      { year: '2024', revenue: 300, operating: 32, net: 26 },
      { year: '2025', revenue: 330, operating: 42, net: 34 },
    ],
    health: [
      { label: '부채비율', value: '45%', status: '안정', description: '기업이 보유한 자기자본 대비 부채 수준이 낮은 편입니다.' },
      { label: '유동비율', value: '210%', status: '우수', description: '단기 부채를 감당할 수 있는 현금성 자산이 충분합니다.' },
      { label: 'ROE', value: '12.8%', status: '양호', description: '주주 자본 대비 수익성이 안정적입니다.' },
      { label: '영업이익률', value: '12.7%', status: '양호', description: '영업이익이 매출 대비 양호한 수준입니다.' },
      { label: 'FCF', value: '18조원', status: '우수', description: '자유현금흐름이 안정적으로 확보되고 있습니다.' },
    ],
    valuation: {
      per: '18.4배',
      per5y: '15.2배',
      pbr: '1.6배',
      pbr5y: '1.4배',
      sentiment: '다소 비쌈',
      explanation: '현재 주가는 과거 5년 평균 밸류에이션 대비 약간 높은 수준에서 거래되고 있습니다.',
    },
    risks: [
      { title: '밸류에이션 부담', level: '중간', description: '최근 주가 상승으로 PER이 과거 평균을 상회하고 있습니다.' },
      { title: '반도체 경기 민감도', level: '중간', description: '반도체 업황 변화에 따라 실적 변동성이 커질 수 있습니다.' },
      { title: '재무건전성', level: '낮음', description: '현재 부채 수준과 현금 보유량은 안정적인 수준입니다.' },
    ],
    competitors: [
      { name: 'SK하이닉스', score: 75, per: '16.8배', roe: '11.9%', margin: '11.0%', debt: '52%' },
      { name: 'TSMC', score: 86, per: '22.4배', roe: '17.3%', margin: '22.8%', debt: '28%' },
      { name: '현대차', score: 70, per: '7.8배', roe: '8.6%', margin: '8.9%', debt: '60%' },
    ],
    conclusion: {
      label: '중립 ~ 긍정',
      text: '기업의 펀더멘털은 안정적이지만 현재 가격 수준에서는 추가적인 상승 여력과 밸류에이션을 함께 확인하는 것이 좋습니다.',
    },
  },
  {
    id: 'naver',
    name: 'NAVER',
    ticker: '035420',
    market: 'KOSPI',
    price: '276,000원',
    change: '+0.85%',
    marketCap: '약 82조원',
    score: 83,
    scoreLabel: '우수',
    scoreSummary: '플랫폼 성장과 광고/커머스 수익이 안정적입니다. 밸류에이션은 적정 수준입니다.',
    metrics: [],
    summary: '기술 플랫폼 중심으로 성장성이 높은 기업입니다.',
    positives: ['광고 수익 안정', '커머스 확장'],
    warnings: ['국내 광고 시장 경쟁', '환율 변동성'],
    trend: [],
    health: [],
    valuation: {
      per: '24.2배',
      per5y: '18.3배',
      pbr: '2.5배',
      pbr5y: '2.1배',
      sentiment: '적정',
      explanation: '플랫폼 성장성과 함께 적정한 밸류에이션 지표를 보이고 있습니다.',
    },
    risks: [],
    competitors: [],
    conclusion: {
      label: '우수',
      text: '플랫폼 경쟁력을 바탕으로 꾸준한 성장성이 예상됩니다.',
    },
    short: '기술 플랫폼 중심으로 성장성이 높은 기업입니다.',
  },
  {
    id: 'hyundai',
    name: '현대차',
    ticker: '005380',
    market: 'KOSPI',
    price: '245,000원',
    change: '-0.21%',
    marketCap: '약 55조원',
    score: 72,
    scoreLabel: '양호',
    scoreSummary: '전기차 전환과 신차 라인업이 강점이지만 글로벌 경기 변수에 민감합니다.',
    metrics: [],
    summary: '전통 제조업과 모빌리티 전환의 중심 기업입니다.',
    positives: ['전기차 모델 확대', '글로벌 판매 회복'],
    warnings: ['환율 영향', '원자재 비용 상승'],
    trend: [],
    health: [],
    valuation: {
      per: '7.8배',
      per5y: '8.4배',
      pbr: '0.9배',
      pbr5y: '1.0배',
      sentiment: '합리적',
      explanation: '현재 밸류에이션은 자동차 업종 평균과 유사한 수준입니다.',
    },
    risks: [],
    competitors: [],
    conclusion: {
      label: '양호',
      text: '전기차 전환과 신차 라인업이 실적 개선에 긍정적으로 작용할 가능성이 큽니다.',
    },
    short: '전통 제조업과 모빌리티 전환의 중심 기업입니다.',
  },
];

export const Watchlist: WatchItem[] = [
  { id: 'samsung', name: '삼성전자', price: '84,500원', score: 78, risk: 'PER 부담 확대', trend: '실적 회복 중' },
  { id: 'naver', name: 'NAVER', price: '276,000원', score: 83, risk: '플랫폼 경쟁', trend: '광고 수익 안정' },
];

export const FilterItems: FilterItem[] = [
  { id: 'score80', label: 'DeepCheck Score 80점 이상' },
  { id: 'value', label: '저평가 기업' },
  { id: 'growth', label: '실적 개선 기업' },
  { id: 'cash', label: '현금흐름 우수' },
  { id: 'debt', label: '부채비율 낮음' },
  { id: 'roe', label: 'ROE 높은 기업' },
];

export const FindResults: FindItem[] = [
  { id: 'samsung', name: '삼성전자', score: 78, status: '양호', per: '18.4배', roe: '12.8%', note: '밸류에이션 부담 있으나 실적 회복세' },
  { id: 'naver', name: 'NAVER', score: 83, status: '우수', per: '24.2배', roe: '15.6%', note: '플랫폼 수익 성장 지속' },
  { id: 'hyundai', name: '현대차', score: 72, status: '양호', per: '7.8배', roe: '8.6%', note: '전기차 전환 강점' },
  { id: 'sk', name: 'SK하이닉스', score: 77, status: '양호', per: '16.8배', roe: '11.9%', note: '메모리 사이클 회복 중' },
  { id: 'lg', name: 'LG에너지솔루션', score: 69, status: '주의', per: '42.1배', roe: '7.0%', note: '밸류에이션 리스크 존재' },
];
