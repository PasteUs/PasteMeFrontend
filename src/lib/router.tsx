import { createHashRouter, Navigate } from 'react-router-dom';
import App from '@/App';
import Home from '@/pages/Home';
import Paste from '@/pages/Paste';
import NotFound from '@/pages/NotFound';

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: ':key',
        element: <Paste />
      },
      {
        path: 'What_are_you_nong_sha_lei',
        element: <NotFound />
      },
      {
        path: '*',
        element: <Navigate to="/What_are_you_nong_sha_lei" replace />
      }
    ]
  }
]);
