type Props = {
  score: number;
  label: string;
  description: string;
};

export default function GaugeCard({ score, label, description }: Props) {
  return (
    <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-card text-center">
      <div className="text-sm uppercase tracking-[0.24em] text-slate-500">{label}</div>
      <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-slate-100 text-5xl font-bold text-slate-900 shadow-inner">
        {score}
      </div>
      <div className="text-sm leading-6 text-slate-600">{description}</div>
    </div>
  );
}
