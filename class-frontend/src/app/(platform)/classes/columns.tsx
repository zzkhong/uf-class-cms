'use client';

import { ColumnsType } from 'antd/es/table';

import { IClass } from '@/interfaces/class.interface';

export const columns: any[] = [
  {
    title: '#',
    dataIndex: '',
    key: '',
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
    dataIndex: 'formTeacher',
    key: 'teacherName',
  },
];

export default columns;
