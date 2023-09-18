import { Navigate, Route, RouteProps } from 'react-router-dom';

const LoginRedirect: React.FC<RouteProps> = (props) => {
  const isAuth = !!localStorage.getItem('access_token');
  return isAuth ? <Navigate to="/news" /> : <Route {...props} />;
};

export default LoginRedirect;
