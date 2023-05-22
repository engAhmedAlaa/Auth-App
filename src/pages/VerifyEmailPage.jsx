import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

function VerifyEmailPage() {
  const { currentUser, verifyEmail, getErrorMessage } = useAuth();
  const [status, setStatus] = useState('loading');
  const location = useLocation();
  const oobCode = location.state.oobCode;
  const run = useRef(true);

  useEffect(() => {
    async function verifyUserEmail() {
      try {
        await verifyEmail(oobCode);
        setStatus('success');
        toast.success('Your email has been verified');
      } catch (error) {
        setStatus('error');
        const message = getErrorMessage(error.code);
        toast.error(message);
      }
    }

    if (run.current) verifyUserEmail();

    return () => {
      run.current = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    toast.dismiss();
  }, []);

  return (
    <>
      <div className="rounded-md border border-gray-300 p-6 dark:border-white/20">
        <h1 className="text-center text-4xl font-semibold">
          {status === 'loading'
            ? 'Verifying Email...'
            : status === 'error'
            ? "Email Does't Get Verified"
            : 'Email Verified'}
        </h1>
      </div>
      {status !== 'loading' && (
        <p className="mt-8 text-center">
          Go to{' '}
          {currentUser ? (
            <Link
              to="/"
              className="text-indigo-600"
              state={{
                email: 'verified',
              }}
            >
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

export default VerifyEmailPage;
