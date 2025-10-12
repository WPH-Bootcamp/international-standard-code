import ProtectedLayout from '@/components/layout/ProtectedLayout';

export const protectedRoutes = {
  path: '/admin',
  element: <ProtectedLayout />,
  children: [],
};
