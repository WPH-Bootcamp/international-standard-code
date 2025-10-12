import { lazy } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';

const Home = lazy(() => import('@/components/pages/home'));
const About = lazy(() => import('@/components/pages/about'));

export const publicRoutes = {
  path: '/public',
  element: <PublicLayout />,
  children: [
    {
      index: true,
      element: <Home />,
    },
    {
      path: 'about',
      element: <About />,
    },
  ],
};
