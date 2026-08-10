import '../globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DeepCheck | 딥체크',
  description: '기업 분석을 쉽게 제공하는 DeepCheck 투자 대시보드 프로토타입입니다.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
