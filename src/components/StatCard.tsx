type Props = {
  label: string;
  value: string;
  status: string;
  description: string;
};

export default function StatCard({ label, value, status, description }: Props) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
      <div className="text-sm font-semibold text-slate-500">{label}</div>
      <div className="mt-3 text-3xl font-bold text-slate-950">{value}</div>
      <div className="mt-2 inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">{status}</div>
      <p className="mt-4 text-sm leading-6 text-slate-500">{description}</p>
    </article>
  );
}
