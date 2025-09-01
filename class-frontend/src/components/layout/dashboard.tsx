'use client';

import { Flex, Layout, Menu, MenuProps } from 'antd';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

const { Header, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const navItems: MenuItem[] = useMemo(
    () => [
      {
        key: 'classes',
        label: 'Classes',
      },
      {
        key: 'teachers',
        label: 'Teachers',
      },
    ],
    [],
  );

  const handleMenuClick = useCallback(
    (e: { key: string }) => {
      router.push(`/${e.key}`);
    },
    [router],
  );

  const getSelectedKey = () => {
    const segments = pathname.split('/').filter(Boolean);
    return segments[0] || 'classes';
  };

  return (
    <Flex gap="middle" wrap>
      <Layout className="min-h-screen">
        <Header className="bg-white flex items-center border-b border-gray-100">
          <Image
            className="mr-12"
            src="/logo.png"
            alt="School Portal Logo"
            width={150}
            height={40}
          />

          <Menu
            rootClassName="bg-white"
            onClick={handleMenuClick}
            className="w-full"
            mode="horizontal"
            defaultSelectedKeys={[getSelectedKey()]}
            items={navItems}
          />
        </Header>

        <Content className="h-full p-12">{children}</Content>
      </Layout>
    </Flex>
  );
}
