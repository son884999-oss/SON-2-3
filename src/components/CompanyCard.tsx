import type { Company } from '@/data/mockData';

type Props = {
  company: Company;
  onSelect: (company: Company) => void;
};

export default function CompanyCard({ company, onSelect }: Props) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card hover:border-slate-300 hover:shadow-lg transition" onClick={() => onSelect(company)}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{company.name}</h3>
          <p className="text-sm text-slate-500">{company.ticker} · {company.market}</p>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">{company.score}점</div>
      </div>
      <div className="mt-5 grid gap-3 text-sm text-slate-600">
        <div>현재가 {company.price}</div>
        <div>{company.scoreSummary}</div>
      </div>
    </article>
  );
}
