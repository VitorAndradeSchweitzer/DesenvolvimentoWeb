import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Feed from '../pages/Feed/Feed';
import Create from '../pages/Create/Create';
import Messages from '../pages/Messages/Messages';
import Profile from '../pages/Profile/Profile';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import ProtectedRoute from '../components/Route/ProtectedRoute';
import PublicRoute from '../components/Route/PublicRoute';
import NotFound from '../pages/NotFound/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <ProtectedRoute><Feed /></ProtectedRoute>
      },
      {
        path: '/create',
        element: <ProtectedRoute><Create /></ProtectedRoute>
      },
      {
        path: '/messages',
        element: <ProtectedRoute><Messages /></ProtectedRoute>
      },
      {
        path: '/profile',
        element: <ProtectedRoute><Profile /></ProtectedRoute>
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  },
  {
    path: '/login',
    element: <PublicRoute><Login /></PublicRoute>
  },
  {
    path: '/register',
    element: <PublicRoute><Register /></PublicRoute>
  },
  {
    path: '*',
    element: <NotFound />
  }
]); 