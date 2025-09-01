'use client';

import { ArrowLeftOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';
import { App, Button, Card, Flex, Form, Input, Select } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import AppLayout from '@/components/layout/app';
import { CLASS_LEVEL_OPTIONS } from '@/constants/options.constant';
import { useApiQuery } from '@/hooks/useApiQuery';
import { useSafeRequest } from '@/hooks/useSafeRequest';
import { ICreateClassRequest } from '@/interfaces/class.interface';
import { IGetTeacherListResponse } from '@/interfaces/teacher.interface';
import { validateAlphaSymbolField } from '@/utils/validation';

type FieldType = {
  level: string;
  name: string;
  teacherEmail: string;
};

export default function CreateClassPage() {
  const router = useRouter();
  const { data: teacherData } =
    useApiQuery<IGetTeacherListResponse>('/teachers');
  const { request, isPending } = useSafeRequest<ICreateClassRequest, null>();
  const { message } = App.useApp();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    await request(
      {
        method: 'POST',
        url: '/classes',
        data: values,
      },
      {
        onSuccess: () => {
          message.success('Successfully created new teacher');
          router.back();
        },
        onError: () => {
          message.error('Something went wrong, please try again!');
        },
      },
    );
  };

  return (
    <AppLayout>
      <Flex justify="space-between" align="center" className="mb-4">
        <h2 className="font-extrabold text-2xl">Add Class</h2>
      </Flex>

      <Form name="name" onFinish={onFinish}>
        <Card variant="borderless" className="mb-4">
          <div className="max-w-[480px]">
            <Form.Item<FieldType>
              label="Class Level"
              name="level"
              layout="vertical"
              rules={[
                { required: true, message: 'Please select a class level.' },
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
                {
                  validator: validateAlphaSymbolField('Class name', 64),
                },
              ]}
            >
              <Input placeholder="Class Name" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Form Teacher"
              name="teacherEmail"
              layout="vertical"
              rules={[
                { required: true, message: 'Please select a form teacher.' },
              ]}
            >
              <Select
                popupRender={(menu) =>
                  teacherData?.data.length ? (
                    menu
                  ) : (
                    <div className="p-2">
                      <p>No existing teachers.</p>
                      <Link href="/teachers/create">Add a teacher</Link>
                    </div>
                  )
                }
                placeholder="Assign a form teacher"
                options={teacherData?.data.map((opt) => ({
                  label: opt.name,
                  value: opt.email,
                }))}
              />
            </Form.Item>
          </div>
        </Card>

        <Flex gap="small" justify="flex-end">
          <Form.Item>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => router.back()}
              disabled={isPending}
            >
              Back
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={isPending}>
              Add Class
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </AppLayout>
  );
}
