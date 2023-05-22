import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function AuthDenied() {
  const { currentUser } = useAuth();

  if (currentUser) return <Navigate to="/" replace />;

  return <Outlet />;
}

export default AuthDenied;
