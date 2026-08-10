type Props = {
  labels: string[];
  revenue: number[];
  operating: number[];
  net: number[];
};

const colors = {
  revenue: 'bg-sky-500',
  operating: 'bg-emerald-500',
  net: 'bg-indigo-500',
};

export default function Chart({ labels, revenue, operating, net }: Props) {
  const allValues = [...revenue, ...operating, ...net];
  const maxValue = Math.max(...allValues, 1);

  return (
    <div className="grid gap-3 rounded-3xl bg-white p-6 shadow-card border border-slate-200">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">재무 트렌드</h2>
          <p className="text-sm text-slate-500">2023년 실적 저점 이후 영업이익과 순이익이 회복되는 흐름입니다.</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {labels.map((year, index) => (
          <div key={year} className="flex flex-col items-center gap-3">
            <div className="flex h-44 w-full items-end gap-2 rounded-3xl bg-slate-100 p-2">
              <div className={`h-[calc(${(revenue[index] / maxValue) * 100}%)] w-full rounded-full ${colors.revenue}`} title={`매출 ${revenue[index]}조`} />
              <div className={`h-[calc(${(operating[index] / maxValue) * 100}%)] w-full rounded-full ${colors.operating}`} title={`영업이익 ${operating[index]}조`} />
              <div className={`h-[calc(${(net[index] / maxValue) * 100}%)] w-full rounded-full ${colors.net}`} title={`순이익 ${net[index]}조`} />
            </div>
            <div className="text-center text-sm font-semibold text-slate-700">{year}</div>
          </div>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-3 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-sky-500" /> 매출
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" /> 영업이익
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-indigo-500" /> 순이익
        </div>
      </div>
    </div>
  );
}
