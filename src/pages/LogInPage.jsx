import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { logInSchema } from '../utils/schemas';
import { LogosGoogleIcon } from '../components/Icons';
import MyPasswordInput from '../components/MyPasswordInput';
import MyEmailInput from '../components/MyEmailInput';

function LogInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { logIn, signInWithGoogle, getErrorMessage } = useAuth();
  const navigate = useNavigate();

  async function handleSignIn() {
    try {
      toast.dismiss();
      setIsLoading(true);
      await signInWithGoogle();
      toast.success('You have signed in');
      navigate('..');
    } catch (error) {
      const message = getErrorMessage(error.code);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmit(values) {
    try {
      toast.dismiss();
      await logIn(values.email, values.password);
      toast.success('You have signed in');
      navigate('..');
    } catch (error) {
      const message = getErrorMessage(error.code);
      toast.error(message);
    }
  }

  return (
    <>
      <div className="rounded-md border border-gray-300 p-6 dark:border-white/20">
        <h1 className="text-center text-4xl font-semibold">Log In</h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={onSubmit}
          validationSchema={logInSchema}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <MyEmailInput label="Email" id="email" name="email" autoFocus />
              <MyPasswordInput label="Password" id="password" name="password" />
              <button
                type="submit"
                className="rounded-md block w-full bg-indigo-600 p-3 font-semibold text-gray-100 outline-none transition-colors disabled:bg-opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging In...' : 'Log In'}
              </button>
            </Form>
          )}
        </Formik>
        <hr className="my-6 border-t-indigo-600" />
        <button
          type="submit"
          className="rounded-md w-full border border-indigo-600 p-3 font-semibold outline-none transition-colors disabled:text-indigo-600/50 flex items-center gap-x-2 justify-center hover:text-indigo-600"
          onClick={handleSignIn}
          disabled={isLoading}
        >
          <LogosGoogleIcon className="text-xl" /> Sign In With Google
        </button>
        <p className="mt-6 text-center">
          <Link to="/forget-password" className="text-indigo-600">
            Forget Password?
          </Link>
        </p>
      </div>
      <p className="mt-8 text-center">
        Need an account?{' '}
        <Link to="/signup" className="text-indigo-600">
          Sign Up
        </Link>
      </p>
    </>
  );
}

export default LogInPage;
