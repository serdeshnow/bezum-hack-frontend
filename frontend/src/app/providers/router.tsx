import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '@/pages/home';
import { RegisterPage } from '@/pages/register/ui/Page/Page';
import { LoginPage } from '@/pages/login/ui/Page/Page';
import { PublicRoute } from '@/app/guards/PublicRoute/PublicRoute.tsx';
import { RequireAuth } from '@/app/guards/RequireAuth/RequireAuth.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: '/home',
    element: (
      <RequireAuth>
        <HomePage />
      </RequireAuth>
    ),
  },
]);
