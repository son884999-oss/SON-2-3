import Link from 'next/link';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-5 sm:px-6">
          <div className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-950">
            <span className="text-slate-900">Deep</span>
            <span className="text-sky-900">Check</span>
          </div>
          <nav className="flex flex-1 flex-wrap gap-2 text-sm text-slate-600 sm:justify-center">
            <NavButton href="/">Home</NavButton>
            <NavButton href="/search">기업검색</NavButton>
            <NavButton href="/analysis">기업분석</NavButton>
            <NavButton href="/watchlist">관심종목</NavButton>
            <NavButton href="/find">종목찾기</NavButton>
          </nav>
          <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">
            로그인
          </button>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">{children}</main>
      <footer className="border-t border-slate-200 bg-white/90 px-4 py-5 text-sm text-slate-600 sm:px-6">
        DeepCheck는 투자 참고용 정보 서비스입니다. 특정 종목 매수/매도를 권유하지 않습니다.
      </footer>
    </div>
  );
}

function NavButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-900">
      {children}
    </Link>
  );
}
