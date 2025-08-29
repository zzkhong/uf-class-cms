"use client";

import { useMemo, useCallback } from "react";
import { MenuProps, Layout, Flex, Menu, ConfigProvider } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { StyleProvider } from "@ant-design/cssinjs";

const { Header, Content } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

type MenuItem = Required<MenuProps>["items"][number];

export default function AppLayout({ children }: AppLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const navItems: MenuItem[] = useMemo(
    () => [
      {
        key: "classes",
        label: "Classes",
      },
      {
        key: "teachers",
        label: "Teachers",
      },
    ],
    []
  );

  const handleMenuClick = useCallback(
    (e: { key: string }) => {
      router.push(`/${e.key}`);
    },
    [router]
  );

  const getSelectedKey = () => {
    if (pathname === "/classes") return "classes";
    if (pathname === "/teachers") return "teachers";
    return "classes";
  };

  return (
    <StyleProvider layer>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#135BB4",
            colorBgBase: "#f7f7f7",
            colorTextBase: "#333333",
          },
        }}
      >
        <Flex gap="middle" wrap>
          <Layout className="min-h-screen">
            <Header className="bg-white flex items-center border-b border-gray-200">
              <h1 className="font-bold mr-16">Logo</h1>

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
      </ConfigProvider>
    </StyleProvider>
  );
}
