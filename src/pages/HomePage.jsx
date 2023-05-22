import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { toast } from 'react-toastify';

// TODO Get Image URL

function HomePage() {
  const { currentUser, signOutUser, verifyUser, getErrorMessage } = useAuth();
  const [isSending, setIsSending] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  async function handleSignOut() {
    try {
      setIsLoggingOut(true);
      await signOutUser();
      toast.success('You have logged out');
      navigate('/login');
    } catch (error) {
      const message = getErrorMessage(error.code);
      toast.error(message);
    } finally {
      setIsLoggingOut(false);
    }
  }

  async function handleSendVerification() {
    try {
      setIsSending(true);
      await verifyUser(currentUser);
      toast.info('Verify link is sent');
    } catch (error) {
      const message = getErrorMessage(error.code);
      toast.error(message);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="text-lg">
      <div className="rounded-md border border-gray-300 p-6 dark:border-white/20">
        <h1 className="text-center text-4xl font-semibold">Profile</h1>
        <div className="mt-8 space-y-5">
          {/* {currentUser.photoURL && (
            <img src={currentUser.photoURL} alt="Avatar" />
          )} */}
          {currentUser.displayName && (
            <p>
              <span className="font-semibold">Name:</span>{' '}
              {currentUser.displayName}
            </p>
          )}
          <p className="break-all">
            <span className="font-semibold">Email:</span> {currentUser.email}
          </p>
          <p>
            <span className="font-semibold">Email Verified:</span>{' '}
            {currentUser.emailVerified ? 'Yes' : 'No'}
          </p>
        </div>
        {!currentUser.emailVerified && (
          <button
            type="button"
            className="mt-5 w-full rounded-md bg-indigo-600 p-3 font-semibold text-gray-100 outline-none transition-colors disabled:bg-opacity-50"
            onClick={handleSendVerification}
            aria-label="Verify Email"
            disabled={isSending}
          >
            {status === 'loading' ? 'Sending Verify Link...' : 'Verify Email'}
          </button>
        )}
        <Link to="update-profile">
          <button className="mt-5 w-full rounded-md bg-indigo-600 p-3 font-semibold text-gray-100 outline-none">
            Update Profile
          </button>
        </Link>
        <Link to="delete-user">
          <button className="mt-5 w-full rounded-md bg-red-600 p-3 font-semibold text-gray-100 outline-none">
            Delete User
          </button>
        </Link>
      </div>
      <button
        className="mx-auto block mt-8 cursor-pointer px-8 py-3 rounded-md bg-indigo-600 text-white font-semibold outline-none transition-colors disabled:bg-opacity-50"
        onClick={handleSignOut}
        disabled={isLoggingOut}
      >
        Log out
      </button>
    </div>
  );
}

export default HomePage;
