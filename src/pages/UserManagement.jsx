import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

function UserManagement() {
  const { currentUser, checkLink, getErrorMessage } = useAuth();
  const [status, setStatus] = useState('loading');
  const search = useLocation().search;
  const params = new URLSearchParams(search);
  const mode = params.get('mode');
  const oobCode = params.get('oobCode');
  const navigate = useNavigate();
  const run = useRef(true);

  useEffect(() => {
    async function checkLinkValidity() {
      try {
        await checkLink(oobCode);
        toast.info('Redirecting');
        setStatus('success');
        switch (mode) {
          case 'resetPassword':
            navigate('reset-password', { replace: true, state: { oobCode } });
            break;
          case 'verifyEmail':
            navigate('verify-email', { replace: true, state: { oobCode } });
            break;
          default:
            throw new Error('Wrong Link');
        }
      } catch (error) {
        setStatus('error');
        const message = getErrorMessage(error.code);
        toast.error(message);
      }
    }

    if (run.current) checkLinkValidity();

    return () => {
      run.current = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === 'success') return <Outlet />;

  return (
    <>
      <div className="rounded-md border border-gray-300 p-6 dark:border-white/20">
        <h1 className="text-center text-4xl font-semibold">
          {status === 'loading'
            ? 'Verifying Link...'
            : status === 'error'
            ? 'link Expired'
            : 'Link Verified'}
        </h1>
      </div>
      {status === 'error' && (
        <p className="mt-8 text-center">
          Go to{' '}
          {currentUser ? (
            <Link to=".." className="text-indigo-600">
              Home
            </Link>
          ) : (
            <Link to="/login" className="text-indigo-600">
              Login
            </Link>
          )}
        </p>
      )}
    </>
  );
}

export default UserManagement;
