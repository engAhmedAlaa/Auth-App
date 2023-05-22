import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { updatePasswordSchema } from '../utils/schemas';
import MyPasswordInput from './MyPasswordInput';

function UpdatePassword() {
  const { updateUserPassword, reauthenticateUser, getErrorMessage } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(values) {
    try {
      toast.dismiss();
      await reauthenticateUser(values.oldPassword);
      await updateUserPassword(values.newPassword);
      toast.success('You have changed your password');
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
          oldPassword: '',
          newPassword: '',
          newPasswordConfirm: '',
        }}
        onSubmit={onSubmit}
        validationSchema={updatePasswordSchema}
      >
        {({ isSubmitting }) => (
          <Form className="mt-8 space-y-6">
            <MyPasswordInput
              label="Old Password"
              id="oldPassword"
              name="oldPassword"
              autoFocus
            />
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
              {isSubmitting ? 'Updating...' : 'Update'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UpdatePassword;
