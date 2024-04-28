import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { NavBar } from '@/components';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Linky | URL shortener',
  icons: { icon: '/favicon.ico' },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html data-theme="valentine" lang="en">
    <body className={inter.className}>
      <NavBar />
      {children}
    </body>
  </html>
);

export default RootLayout;
