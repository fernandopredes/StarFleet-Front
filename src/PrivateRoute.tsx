import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuth = !!localStorage.getItem('access_token');
  if (!isAuth) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};


export default PrivateRoute;
