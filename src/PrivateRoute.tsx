import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuth = !!localStorage.getItem('jwt');
  if (!isAuth) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};


export default PrivateRoute;
