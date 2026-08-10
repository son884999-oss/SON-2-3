'use client';

import { Watchlist } from '@/data/mockData';

export default function WatchlistPage() {
  return (
    <section className="grid gap-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-card">
        <h1 className="text-3xl font-bold text-slate-950">관심종목</h1>
        <p className="mt-4 text-slate-600">관심종목은 로컬 상태로 저장되어 빠르게 확인 가능한 기업 목록입니다.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {Watchlist.map(item => (
          <article key={item.id} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-950">{item.name}</h2>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">Score {item.score}</span>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600">
              <span>현재가 {item.price}</span>
              <span>{item.risk}</span>
            </div>
            <p className="mt-4 text-slate-600">최근 동향: {item.trend}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
