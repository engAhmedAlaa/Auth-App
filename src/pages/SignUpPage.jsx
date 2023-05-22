import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { signUpSchema } from '../utils/schemas';
import MyEmailInput from '../components/MyEmailInput';
import MyPasswordInput from '../components/MyPasswordInput';

function SignUpPage() {
  const { signIn, verifyUser, getErrorMessage } = useAuth();

  async function onSubmit(values) {
    try {
      toast.dismiss();
      const { user } = await signIn(values.email, values.password);
      toast.success('You have signed up');
      setTimeout(() => {
        toast.info('Check your inbox for email verification');
      }, 2000);
      await verifyUser(user);
    } catch (error) {
      const message = getErrorMessage(error.code);
      toast.error(message);
    }
  }

  return (
    <>
      <div className="rounded-md border border-gray-300 dark:border-white/20 p-6">
        <h1 className="text-center text-4xl font-semibold">Sign Up</h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
            passwordConfirm: '',
          }}
          onSubmit={onSubmit}
          validationSchema={signUpSchema}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <MyEmailInput label="Email" id="email" name="email" autoFocus />
              <MyPasswordInput label="Password" id="password" name="password" />
              <MyPasswordInput
                label="Confirm Password"
                id="passwordConfirm"
                name="passwordConfirm"
              />
              <button
                type="submit"
                className="block w-full rounded-md bg-indigo-600 p-3 font-semibold text-gray-100 outline-none transition-colors disabled:bg-opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <p className="mt-8 text-center">
        Already Have an account?{' '}
        <Link to="/login" className="text-indigo-600">
          Log In
        </Link>
      </p>
    </>
  );
}

export default SignUpPage;
