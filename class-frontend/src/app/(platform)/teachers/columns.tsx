'use client';

import { ColumnsType } from 'antd/es/table';

export const columns: any[] = [
  {
    title: '#',
    dataIndex: '',
    key: '',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Subject',
    dataIndex: 'subject',
    key: 'subject',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Work Contact',
    dataIndex: 'contactNumber',
    key: 'contactNumber',
  },
];

export default columns;
