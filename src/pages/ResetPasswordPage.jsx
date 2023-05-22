import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { resetPasswordSchema } from '../utils/schemas';
import MyPasswordInput from '../components/MyPasswordInput';

function ResetPasswordPage() {
  const { resetPassword, getErrorMessage } = useAuth();
  const location = useLocation();
  const oobCode = location.state.oobCode;
  const navigate = useNavigate();

  async function onSubmit(values) {
    try {
      toast.dismiss();
      await resetPassword(oobCode, values.newPassword);
      toast.success('You have changed the password');
      navigate('/login');
    } catch (error) {
      const message = getErrorMessage(error.code);
      toast.error(message);
    }
  }

  useEffect(() => {
    toast.dismiss();
  }, []);

  return (
    <>
      <div className="rounded-md border border-gray-300 dark:border-white/20 p-6">
        <h1 className="text-center text-4xl font-semibold">Reset Password</h1>
        <Formik
          initialValues={{
            newPassword: '',
            newPasswordConfirm: '',
          }}
          onSubmit={onSubmit}
          validationSchema={resetPasswordSchema}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <MyPasswordInput
                label="New Password"
                id="newPassword"
                name="newPassword"
              />
              <MyPasswordInput
                label="Confirm New Password"
                id="newPasswordConfirm"
                name="newPasswordConfirm"
              />
              <button
                type="submit"
                className="block w-full rounded-md bg-indigo-600 p-3 font-semibold text-gray-100 outline-none transition-colors disabled:bg-opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <p className="mt-8 text-center">
        Remembered Password?{' '}
        <Link to="/login" className="text-indigo-600">
          Login
        </Link>
      </p>
    </>
  );
}

export default ResetPasswordPage;
