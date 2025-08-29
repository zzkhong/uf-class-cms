"use client";

import type { FormProps } from "antd";
import { Button, Form, Input, Card, Flex } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import AppLayout from "@/components/AppLayout";
import { useRouter } from "next/navigation";

type FieldType = {
  name: string;
  subject: string;
  email: string;
  contactNumber: string;
};

export default function CreateTeacherPage() {
  const router = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <AppLayout>
      <Flex justify="space-between" align="center" className="mb-4">
        <h2 className="font-extrabold text-2xl">Add Teacher</h2>
      </Flex>

      <Form
        name="name"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Card variant="borderless" className="mb-4">
          <div className="max-w-[480px]">
            <Form.Item<FieldType>
              label="Name"
              name="name"
              layout="vertical"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Subject"
              name="subject"
              layout="vertical"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Email Address"
              name="email"
              layout="vertical"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Work Contact Number"
              name="contactNumber"
              layout="vertical"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
        </Card>

        <Flex gap="small" justify="flex-end">
          <Form.Item>
            <Button
              icon={<ArrowLeftOutlined />}
              size="large"
              onClick={() => router.back()}
            >
              Back
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              Add Teacher
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </AppLayout>
  );
}
