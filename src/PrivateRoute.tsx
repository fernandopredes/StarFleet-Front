import { Navigate, Route } from 'react-router-dom';
import React from 'react';

interface PrivateRouteProps {
  path: string;
  element: React.ReactElement;
  children?: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, children, ...rest }) => {
  const isAuth = localStorage.getItem('jwt');
  return (
    <Route {...rest} element={isAuth ? element : <Navigate to="/login" />} >
      {children}
    </Route>
  );
};
