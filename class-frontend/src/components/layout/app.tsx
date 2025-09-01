'use client';

import { StyleProvider } from '@ant-design/cssinjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';

interface AppLayoutProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <StyleProvider layer>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: 'Inter',
              colorPrimary: '#135BB4',
              colorBgBase: '#f7f7f7',
              colorTextBase: '#333333',
            },
          }}
        >
          {children}
        </ConfigProvider>
      </StyleProvider>
    </QueryClientProvider>
  );
}
