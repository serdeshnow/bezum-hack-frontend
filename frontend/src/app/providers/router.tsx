import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '@/pages/home';
// import { AboutPage } from '@/pages/about';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  // {
  //   path: '/about',
  //   element: <AboutPage />,
  // },
]);
