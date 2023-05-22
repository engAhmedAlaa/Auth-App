import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { forgetPasswordSchema } from '../utils/schemas';
import MyEmailInput from '../components/MyEmailInput';

function ForgetPassword() {
  const { sendResetEmail, getErrorMessage } = useAuth();

  async function onSubmit(values) {
    try {
      toast.dismiss();
      await sendResetEmail(values.email);
      toast.success('Check your inbox');
    } catch (error) {
      const message = getErrorMessage(error.code);
      toast.error(message);
    }
  }

  return (
    <>
      <div className="rounded-md border border-gray-300 p-6 dark:border-white/20">
        <h1 className="text-center text-4xl font-semibold">Forget password</h1>
        <Formik
          initialValues={{
            email: '',
          }}
          onSubmit={onSubmit}
          validationSchema={forgetPasswordSchema}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <MyEmailInput label="Email" id="email" name="email" autoFocus />
              <button
                type="submit"
                className="block w-full rounded-md bg-indigo-600 p-3 font-semibold text-gray-100 outline-none transition-colors disabled:bg-opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending Reset Link...' : 'Send Reset Link'}
              </button>
            </Form>
          )}
        </Formik>
        <p className="mt-6 text-center">
          <Link to="/login" className="text-indigo-600">
            Log In
          </Link>
        </p>
      </div>
      <p className="mt-8 text-center">
        Need an account?{' '}
        <Link to="/signup" className="text-indigo-600">
          Sign up
        </Link>
      </p>
    </>
  );
}

export default ForgetPassword;
