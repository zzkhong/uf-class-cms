"use client";

import { Button, Card, Flex, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AppLayout from "@/components/AppLayout";

export default function ClassesPage() {
  return (
    <AppLayout>
      <Flex justify="space-between" align="center" className="mb-4">
        <h1 className="font-bold">Classes</h1>

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
    </AppLayout>
  );
}
