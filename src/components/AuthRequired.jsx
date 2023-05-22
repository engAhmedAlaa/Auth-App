import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function AuthRequired() {
  const { currentUser } = useAuth();

  if (!currentUser) return <Navigate to="login" replace />;

  return <Outlet />;
}

export default AuthRequired;
