"use client";

import {
  Button,
  Card,
  ConfigProvider,
  Flex,
  Layout,
  Menu,
  MenuProps,
  Table,
} from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import { PlusOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

export default function HomePage() {
  const navItems: MenuItem[] = [
    {
      key: "classes",
      label: "Classes",
    },
    {
      key: "teachers",
      label: "Teachers",
    },
  ];

  return (
    <StyleProvider layer>
      <ConfigProvider>
        <Flex gap="middle" wrap>
          <Layout className="min-h-screen">
            <Header className="bg-white flex items-center border-b border-gray-200">
              <h1 className="font-bold mr-8">Logo</h1>

              <Menu
                className="w-full"
                mode="horizontal"
                defaultSelectedKeys={["teachers"]}
                items={navItems}
              />
            </Header>

            <Content className="h-full p-12">
              <Flex justify="space-between" align="center" className="mb-4">
                <h1 className="font-bold ">Classes</h1>

                <Button type="primary" icon={<PlusOutlined />} size="large">
                  Add Class
                </Button>
              </Flex>

              <Card variant="borderless">
                <Table
                  dataSource={[
                    {
                      key: "1",
                      name: "Mike",
                      age: 32,
                      address: "10 Downing Street",
                    },
                    {
                      key: "2",
                      name: "John",
                      age: 42,
                      address: "10 Downing Street",
                    },
                  ]}
                  columns={[
                    {
                      title: "Name",
                      dataIndex: "name",
                      key: "name",
                    },
                    {
                      title: "Age",
                      dataIndex: "age",
                      key: "age",
                    },
                    {
                      title: "Address",
                      dataIndex: "address",
                      key: "address",
                    },
                  ]}
                />
              </Card>
            </Content>
          </Layout>
        </Flex>
      </ConfigProvider>
    </StyleProvider>
  );
}
