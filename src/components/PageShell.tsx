type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function PageShell({ title, subtitle, children }: Props) {
  return (
    <section className="grid gap-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-card">
        <h1 className="text-3xl font-bold text-slate-950">{title}</h1>
        {subtitle ? <p className="mt-4 text-slate-600">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}
