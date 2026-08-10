'use client';

import { FilterItems, FindResults } from '@/data/mockData';
import { useMemo, useState } from 'react';

export default function FindPage() {
  const [filter, setFilter] = useState('');

  const filteredResults = useMemo(() => {
    if (!filter) return FindResults;
    if (filter === 'score80') return FindResults.filter(item => item.score >= 80);
    if (filter === 'value') return FindResults.filter(item => parseFloat(item.per) < 20);
    if (filter === 'growth') return FindResults.filter(item => item.note.includes('회복') || item.note.includes('성장'));
    if (filter === 'cash') return FindResults.filter(item => item.note.includes('현금') || item.note.includes('플랫폼'));
    if (filter === 'debt') return FindResults.filter(item => !item.note.includes('부채'));
    if (filter === 'roe') return FindResults.filter(item => parseFloat(item.roe) >= 10);
    return FindResults;
  }, [filter]);

  return (
    <section className="grid gap-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-card">
        <h1 className="text-3xl font-bold text-slate-950">종목찾기</h1>
        <p className="mt-4 text-slate-600">조건을 선택해 투자 기준에 맞는 기업을 빠르게 찾아보세요.</p>
      </div>
      <div className="grid gap-6">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-card">
          <h2 className="text-lg font-semibold text-slate-950">검색 필터</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {FilterItems.map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={`rounded-full border px-4 py-2 text-sm transition ${filter === item.id ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {filteredResults.map(item => (
            <article key={item.id} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-card">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-slate-950">{item.name}</h2>
                <span className="rounded-full bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-700">{item.status}</span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <span>Score {item.score}</span>
                <span>PER {item.per}</span>
                <span>ROE {item.roe}</span>
              </div>
              <p className="mt-4 text-slate-600">{item.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
