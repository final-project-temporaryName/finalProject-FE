import { AuthSession } from '@/contexts/AuthSessionProvider';
import ReactQueryProviders from '@/utils/react-query-provider';
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import '../styles/globals.css';

// Noto sans 폰트 적용
const notoSansKr = Noto_Sans_KR({
  preload: false,
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Team Six',
  description: 'Team Six',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={notoSansKr.className}>
        <AuthSession>
          <ReactQueryProviders>{children}</ReactQueryProviders>
        </AuthSession>
      </body>
    </html>
  );
}
