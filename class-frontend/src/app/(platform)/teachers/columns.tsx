'use client';

import { ColumnsType } from 'antd/es/table';

import { ITeacher } from '@/interfaces/teacher.interface';
import { formatContact } from '@/utils/format';

export const columns: ColumnsType<ITeacher> = [
  {
    title: '#',
    dataIndex: 'index',
    key: 'index',
    render: (val, record, i) => i + 1,
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
    render: (val) => formatContact(val),
  },
];

export default columns;
