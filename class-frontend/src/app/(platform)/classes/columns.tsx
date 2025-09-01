'use client';

import { ColumnsType } from 'antd/es/table';

import { IClass } from '@/interfaces/class.interface';

export const columns: ColumnsType<IClass> = [
  {
    title: '#',
    dataIndex: 'index',
    key: 'index',
    render: (val, record, i) => i + 1,
  },
  {
    title: 'Class Level',
    dataIndex: 'level',
    key: 'level',
  },
  {
    title: 'Class Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Form Teacher',
    dataIndex: ['formTeacher', 'name'],
    key: 'formTeacherName',
  },
];

export default columns;
