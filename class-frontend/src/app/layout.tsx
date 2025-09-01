import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { Metadata } from 'next';
import { PublicEnvScript } from 'next-runtime-env';
import { Inter } from 'next/font/google';

import AppLayout from '@/components/layout/app';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'School Portal',
  description: 'UF School Portal',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <PublicEnvScript />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AppLayout>
          <AntdRegistry>{children}</AntdRegistry>
        </AppLayout>
      </body>
    </html>
  );
}
