import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function NotFound() {
  const { currentUser } = useAuth();

  return (
    <>
      <div className="rounded-md border border-gray-300 p-6">
        <h1 className="text-center text-4xl font-semibold">Not Found</h1>
      </div>
      <p className="mt-4 text-center text-lg">
        Go to{' '}
        {currentUser ? (
          <Link to=".." className="text-indigo-600">
            Dashboard
          </Link>
        ) : (
          <Link to="/login" className="text-indigo-600">
            Login
          </Link>
        )}
      </p>
    </>
  );
}

export default NotFound;
