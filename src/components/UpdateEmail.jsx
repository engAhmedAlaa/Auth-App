import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { updateEmailSchema } from '../utils/schemas';
import MyEmailInput from './MyEmailInput';
import MyPasswordInput from './MyPasswordInput';

function UpdateEmail() {
  const { currentUser, updateUserEmail, reauthenticateUser, getErrorMessage } =
    useAuth();
  const navigate = useNavigate();

  async function onSubmit(values) {
    try {
      if (currentUser.email === values.email)
        return toast.error('You have entered the same email');
      toast.dismiss();
      await reauthenticateUser(values.password);
      await updateUserEmail(values.email);
      toast.success('You have changed your email');
      navigate('..');
    } catch (error) {
      const message = getErrorMessage(error.code);
      toast.error(message);
    }
  }

  return (
    <div>
      <Formik
        initialValues={{
          email: currentUser.email,
          password: '',
        }}
        onSubmit={onSubmit}
        validationSchema={updateEmailSchema}
      >
        {({ isSubmitting }) => (
          <Form className="mt-8 space-y-6">
            <MyEmailInput
              label="Email"
              id="email"
              name="email"
              autoComplete="off"
              autoFocus
            />
            <MyPasswordInput label="Password" id="password" name="password" />
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 p-3 font-semibold text-gray-100 outline-none transition-colors disabled:bg-opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UpdateEmail;
