'use client';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Table } from 'antd';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { useApiQuery } from '@/hooks/useApiQuery';
import { IGetClassListResponse } from '@/interfaces/class.interface';

import columns from './columns';

export default function ClassesPage() {
  const router = useRouter();
  const { isLoading, data: classesData } =
    useApiQuery<IGetClassListResponse>('/classes');

  const handleAddClass = useCallback(() => {
    router.push('/classes/create');
  }, [router]);

  const AddClassButton = () => (
    <Button type="primary" icon={<PlusOutlined />} onClick={handleAddClass}>
      Add Class
    </Button>
  );

  return (
    <>
      <Flex justify="space-between" align="center" className="mb-4">
        <h2 className="font-extrabold text-2xl">Classes</h2>

        {!!classesData?.data.length && <AddClassButton />}
      </Flex>

      <Card variant="borderless">
        {classesData?.data.length || isLoading ? (
          <Table
            rowKey={(record) => record.name}
            loading={isLoading}
            dataSource={classesData?.data}
            columns={columns}
            pagination={{ position: ['none'] }}
          />
        ) : (
          <div className="w-full min-h-80 flex flex-col items-center justify-center">
            <p className="font-extrabold mb-6">
              There are no existing classes yet
            </p>

            <AddClassButton />
          </div>
        )}
      </Card>
    </>
  );
}
