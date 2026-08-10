'use client';

import { useMemo, useState } from 'react';
import { Companies } from '@/data/mockData';
import Button from '@/components/Button';
import CompanyCard from '@/components/CompanyCard';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [searchError, setSearchError] = useState('');

  const hintButtons = useMemo(
    () => [Companies[0], Companies[1], Companies[2]],
    []
  );

  function handleSearch() {
    if (!query.trim()) {
      setSearchError('검색어를 입력해주세요.');
      return;
    }
    setSearchError('');
    const matched = Companies.find(company =>
      company.name.includes(query) || company.ticker.includes(query)
    );
    if (!matched) {
      setSearchError('검색 결과가 없습니다. 다른 기업명을 입력해보세요.');
      return;
    }
    window.location.href = `/analysis?company=${matched.id}`;
  }

  return (
    <div className="grid gap-10">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-card">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">DeepCheck</p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            이 회사, 투자하기 전에 딥체크.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            재무제표를 몰라도 괜찮습니다. DeepCheck가 기업의 실적, 성장, 재무건전성, 적정가격과 위험 신호를 쉽게 정리해드립니다.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-7">
            <label className="mb-3 block text-sm font-semibold text-slate-700">기업명 또는 종목코드 검색</label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={query}
                onChange={event => setQuery(event.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 text-base shadow-sm outline-none focus:border-sky-500"
                placeholder="기업명 또는 종목코드를 입력하세요."
              />
              <Button className="bg-slate-900 text-white hover:bg-slate-800" onClick={handleSearch}>
                분석 시작
              </Button>
            </div>
            {searchError ? <p className="mt-3 text-sm text-red-600">{searchError}</p> : null}
            <div className="mt-6 flex flex-wrap gap-3">
              {hintButtons.map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => (window.location.href = `/analysis?company=${item.id}`)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm transition hover:border-slate-300"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            {[
              { title: '기업 건강검진', description: '재무 상태와 안정성을 한눈에 확인합니다.' },
              { title: '투자 신호', description: '긍정 신호와 위험 신호를 직관적으로 정리합니다.' },
              { title: '적정가격 분석', description: 'PER/PBR 기준으로 현재 가격 수준을 판단합니다.' },
              { title: '위험 신호 탐지', description: '재무 리스크를 쉽게 파악할 수 있습니다.' },
            ].map(item => (
              <article key={item.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-card">
                <h2 className="text-lg font-semibold text-slate-950">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="grid gap-5 sm:grid-cols-3">
        {Companies.slice(0, 3).map(company => (
          <CompanyCard key={company.id} company={company} onSelect={() => (window.location.href = `/analysis?company=${company.id}`)} />
        ))}
      </section>
    </div>
  );
}
