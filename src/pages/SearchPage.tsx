'use client';

import { useState } from 'react';
import { Companies } from '@/data/mockData';
import Button from '@/components/Button';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  function handleSearch() {
    if (!query.trim()) {
      setError('기업명 또는 종목코드를 입력해주세요.');
      return;
    }
    setError('');
    const company = Companies.find(item => item.name.includes(query) || item.ticker.includes(query));
    if (!company) {
      setError('검색 결과가 없습니다. 다른 기업명을 입력해보세요.');
      return;
    }
    window.location.href = `/analysis?company=${company.id}`;
  }

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-card">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-slate-950">기업 검색</h1>
        <p className="mt-4 text-slate-600">검색된 기업을 DeepCheck 분석 화면으로 바로 이동합니다.</p>
      </div>
      <div className="mt-10 grid gap-6">
        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
          <label className="mb-3 block text-sm font-semibold text-slate-700">기업명 또는 종목코드</label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 text-base shadow-sm outline-none focus:border-sky-500"
              placeholder="예: 삼성전자, NAVER, 005930"
            />
            <Button className="bg-slate-900 text-white hover:bg-slate-800" onClick={handleSearch}>
              검색 결과 보기
            </Button>
          </div>
          {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
          <p className="mt-4 text-sm text-slate-500">검색 기능은 DeepCheck가 미리 만든 기업 데이터를 기반으로 빠르게 결과를 제공합니다.</p>
        </div>
      </div>
    </section>
  );
}
