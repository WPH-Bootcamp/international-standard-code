import { createBrowserRouter } from 'react-router-dom';
import { publicRoutes } from './public';
import { protectedRoutes } from './protected';
import { authRoutes } from './auth';

const router = createBrowserRouter([publicRoutes, protectedRoutes, authRoutes]);

export default router;
