import { createBrowserRouter } from 'react-router-dom';
import { publicRoutes } from './public';
import { protectedRoutes } from './protected';

const router = createBrowserRouter([publicRoutes, protectedRoutes]);

export default router;
