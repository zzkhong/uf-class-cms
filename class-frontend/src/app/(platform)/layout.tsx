import { ReactNode } from 'react';

import DashboardLayout from '@/components/layout/dashboard';

type Props = {
  children: ReactNode;
};

export default function PlatformLayout({ children }: Props) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
