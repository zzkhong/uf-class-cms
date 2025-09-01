'use client';

import { ArrowLeftOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';
import { Button, Card, Flex, Form, Input, Select } from 'antd';
import { useRouter } from 'next/navigation';

import AppLayout from '@/components/layout/app';
import { MAIN_SUBJECT_OPTIONS } from '@/constants/options.constant';

type FieldType = {
  name: string;
  subject: string;
  email: string;
  contactNumber: string;
};

export default function CreateTeacherPage() {
  const router = useRouter();

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo);
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
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Subject"
              name="subject"
              layout="vertical"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Select
                placeholder="Select a subject"
                options={MAIN_SUBJECT_OPTIONS.map((opt) => ({
                  label: opt,
                  value: opt,
                }))}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label="Email Address"
              name="email"
              layout="vertical"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input placeholder="Email Address" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Work Contact Number"
              name="contactNumber"
              layout="vertical"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input placeholder="Work Contact Number" />
            </Form.Item>
          </div>
        </Card>

        <Flex gap="small" justify="flex-end">
          <Form.Item>
            <Button icon={<ArrowLeftOutlined />} onClick={() => router.back()}>
              Back
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Teacher
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </AppLayout>
  );
}
