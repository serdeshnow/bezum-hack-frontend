import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '@/pages/home';
import { RegisterPage } from '@/pages/register/ui/Page/Page.tsx';
// import { AboutPage } from '@/pages/about';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RegisterPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  // {
  //   path: '/about',
  //   element: <AboutPage />,
  // },
]);
