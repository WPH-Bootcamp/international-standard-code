import { lazy } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';

const Login = lazy(() => import('@/components/pages/auth/login'));

export const authRoutes = {
  path: '/auth',
  element: <PublicLayout />,
  children: [
    {
      index: true,
      element: <Login />,
    },
  ],
};
