'use client';

import { useEffect, useMemo, useState } from 'react';
import { Companies } from '@/data/mockData';
import Chart from '@/components/Chart';
import GaugeCard from '@/components/GaugeCard';
import MetricCard from '@/components/MetricCard';
import StatCard from '@/components/StatCard';

const defaultCompany = Companies[0];

export default function AnalysisPage() {
  const [company, setCompany] = useState(defaultCompany);
  const [companyId, setCompanyId] = useState('samsung');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const companyQuery = params.get('company');
    if (!companyQuery) {
      return;
    }
    const matched = Companies.find(item => item.id === companyQuery);
    if (matched) {
      setCompany(matched);
      setCompanyId(matched.id);
    }
  }, []);

  const companyMetrics = useMemo(() => company.metrics.length ? company.metrics : defaultCompany.metrics, [company]);
  const companyTrend = useMemo(() => company.trend.length ? company.trend : defaultCompany.trend, [company]);

  return (
    <div className="grid gap-10">
      <section className="grid gap-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-card lg:grid-cols-[1.3fr_0.9fr]">
        <div className="grid gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">{company.market}</span>
            <span className="text-sm text-slate-500">{company.ticker}</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-950">{company.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-slate-700">
            <div className="text-4xl font-bold">{company.price}</div>
            <div className="rounded-full bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-700">{company.change}</div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">DeepCheck Score</h2>
            <div className="mt-4 flex items-center gap-4 text-5xl font-bold text-slate-950">{company.score}</div>
            <p className="mt-3 text-sm text-slate-600">{company.scoreLabel} · {company.scoreSummary}</p>
          </div>
        </div>
        <div className="grid gap-4">
          <GaugeCard score={company.score} label="종합점수" description={company.scoreSummary} />
          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">관심종목에 추가</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">현재 분석 중인 기업을 관심종목으로 저장하고 빠르게 다시 확인할 수 있습니다.</p>
            <button
              className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              onClick={() => alert('관심종목에 추가되었습니다.')}>
              관심종목 추가
            </button>
          </div>
        </div>
      </section>
      <section className="grid gap-6">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-card">
          <h2 className="text-xl font-semibold text-slate-950">핵심 분석</h2>
          <div className="mt-6 grid gap-5 xl:grid-cols-5 lg:grid-cols-2">
            {companyMetrics.map(metric => (
              <MetricCard
                key={metric.label}
                label={metric.label}
                value={metric.value}
                status={metric.status}
                comment={metric.comment}
              />
            ))}
          </div>
        </div>
        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-card">
            <h2 className="text-xl font-semibold text-slate-950">DeepCheck 한줄 분석</h2>
            <p className="mt-4 text-slate-600 leading-7">{company.summary}</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">긍정 신호</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {company.positives.map(item => <li key={item}>• {item}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">주의 신호</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {company.warnings.map(item => <li key={item}>• {item}</li>)}
                </ul>
              </div>
            </div>
          </section>
          <Chart
            labels={companyTrend.map(item => item.year)}
            revenue={companyTrend.map(item => item.revenue)}
            operating={companyTrend.map(item => item.operating)}
            net={companyTrend.map(item => item.net)}
          />
        </div>
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-card">
            <h2 className="text-xl font-semibold text-slate-950">기업 건강검진</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {company.health.map(item => (
                <StatCard
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  status={item.status}
                  description={item.description}
                />
              ))}
            </div>
          </section>
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-card">
            <h2 className="text-xl font-semibold text-slate-950">밸류에이션 분석</h2>
            <div className="mt-6 space-y-4 text-sm text-slate-600">
              <div className="grid gap-3 rounded-3xl bg-slate-50 p-5">
                <div className="flex justify-between"><span>현재 PER</span><strong>{company.valuation.per}</strong></div>
                <div className="flex justify-between"><span>5년 평균 PER</span><strong>{company.valuation.per5y}</strong></div>
                <div className="flex justify-between"><span>현재 PBR</span><strong>{company.valuation.pbr}</strong></div>
                <div className="flex justify-between"><span>5년 평균 PBR</span><strong>{company.valuation.pbr5y}</strong></div>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="font-semibold text-slate-900">{company.valuation.sentiment}</p>
                <p className="mt-3 text-slate-600">{company.valuation.explanation}</p>
                <div className="mt-5 h-3 rounded-full bg-slate-200">
                  <div className="h-full rounded-full bg-gradient-to-r from-sky-600 to-slate-900" style={{ width: '68%' }} />
                </div>
                <div className="mt-2 flex justify-between text-xs text-slate-500">
                  <span>저평가</span>
                  <span>적정</span>
                  <span>고평가</span>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-card">
            <h2 className="text-xl font-semibold text-slate-950">위험 신호</h2>
            <div className="mt-6 grid gap-4">
              {company.risks.map(risk => (
                <div key={risk.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base font-semibold text-slate-950">{risk.title}</h3>
                    <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-700">{risk.level}</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{risk.description}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-card">
            <h2 className="text-xl font-semibold text-slate-950">DeepCheck 결론</h2>
            <div className="mt-5 rounded-3xl bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">{company.conclusion.label}</h3>
              <p className="mt-4 text-slate-600 leading-7">{company.conclusion.text}</p>
            </div>
          </section>
        </div>
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-card">
          <h2 className="text-xl font-semibold text-slate-950">경쟁사 비교</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead className="border-b border-slate-200 text-slate-500">
                <tr>
                  <th className="px-4 py-3">기업</th>
                  <th className="px-4 py-3">DeepCheck</th>
                  <th className="px-4 py-3">PER</th>
                  <th className="px-4 py-3">ROE</th>
                  <th className="px-4 py-3">영업이익률</th>
                  <th className="px-4 py-3">부채비율</th>
                </tr>
              </thead>
              <tbody>
                {company.competitors.map(item => (
                  <tr key={item.name} className="border-b border-slate-200 last:border-none">
                    <td className="px-4 py-4">{item.name}</td>
                    <td className="px-4 py-4 font-semibold">{item.score}</td>
                    <td className="px-4 py-4">{item.per}</td>
                    <td className="px-4 py-4">{item.roe}</td>
                    <td className="px-4 py-4">{item.margin}</td>
                    <td className="px-4 py-4">{item.debt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </div>
  );
}
