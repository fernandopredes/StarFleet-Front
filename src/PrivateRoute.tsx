import { Navigate, useLocation } from 'react-router-dom';

type PrivateRouteProps = {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuth = !!localStorage.getItem('jwt');
  const location = useLocation();

  // Se não estiver autenticado e tentar acessar uma rota protegida, redirecione para a página de login.
  if (!isAuth && location.pathname !== "/") {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;

