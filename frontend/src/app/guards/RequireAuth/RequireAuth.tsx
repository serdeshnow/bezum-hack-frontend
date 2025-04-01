import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

interface RequireAuthProps {
  children: React.ReactNode;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const username = Cookies.get('username');
  const password = Cookies.get('password');
  const location = useLocation();

  if (!username || !password) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
