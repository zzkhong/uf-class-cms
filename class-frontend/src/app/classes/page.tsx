"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Table } from "antd";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import AppLayout from "@/components/AppLayout";

export default function ClassesPage() {
  const router = useRouter();

  const handleAddClass = useCallback(() => {
    router.push("/classes/create");
  }, [router]);

  return (
    <AppLayout>
      <Flex justify="space-between" align="center" className="mb-4">
        <h2 className="font-extrabold text-2xl">Classes</h2>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={handleAddClass}
        >
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
