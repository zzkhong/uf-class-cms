'use client';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Table } from 'antd';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { useApiQuery } from '@/hooks/useApiQuery';
import { IGetTeacherListResponse } from '@/interfaces/teacher.interface';

import columns from './columns';

export default function TeachersPage() {
  const router = useRouter();
  const { isLoading, data: teacherData } =
    useApiQuery<IGetTeacherListResponse>('/teachers');

  const handleAddTeacher = useCallback(() => {
    router.push('/teachers/create');
  }, [router]);

  const AddTeacherButton = () => (
    <Button
      type="primary"
      icon={<PlusOutlined />}
      size="large"
      onClick={handleAddTeacher}
    >
      Add Teacher
    </Button>
  );

  return (
    <>
      <Flex justify="space-between" align="center" className="mb-4">
        <h2 className="font-extrabold text-2xl">Teachers</h2>

        {!!teacherData?.data.length && <AddTeacherButton />}
      </Flex>

      <Card variant="borderless">
        {teacherData?.data.length || isLoading ? (
          <Table
            loading={isLoading}
            dataSource={teacherData?.data}
            columns={columns}
          />
        ) : (
          <div className="w-full min-h-80 flex flex-col items-center justify-center">
            <p className="font-extrabold mb-6">
              There are no existing teachers yet.
            </p>

            <AddTeacherButton />
          </div>
        )}
      </Card>
    </>
  );
}
