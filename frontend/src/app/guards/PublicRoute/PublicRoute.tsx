import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const username = Cookies.get('username');
  const password = Cookies.get('password');

  if (username && password) {
    return <Navigate to="/home" replace />;
  }
  return children;
};
