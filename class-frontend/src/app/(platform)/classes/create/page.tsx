'use client';

import { ArrowLeftOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';
import { Button, Card, Flex, Form, Input, Select } from 'antd';
import { useRouter } from 'next/navigation';

import AppLayout from '@/components/layout/app';
import { CLASS_LEVEL_OPTIONS } from '@/constants/options.constant';

type FieldType = {
  level: string;
  name: string;
  teacherEmail: string;
};

export default function CreateClassPage() {
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
        <h2 className="font-extrabold text-2xl">Add Class</h2>
      </Flex>

      <Form name="name" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Card variant="borderless" className="mb-4">
          <div className="max-w-[480px]">
            <Form.Item<FieldType>
              label="Class Level"
              name="level"
              layout="vertical"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Select
                placeholder="Select a level"
                options={CLASS_LEVEL_OPTIONS.map((opt) => ({
                  label: opt,
                  value: opt,
                }))}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label="Class Name"
              name="name"
              layout="vertical"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input placeholder="Class Name" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Form Teacher"
              name="teacherEmail"
              layout="vertical"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Select placeholder="Assign a form teacher" />
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
              Add Class
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </AppLayout>
  );
}
