import { Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { deleteUserSchema } from '../utils/schemas';
import MyPasswordInput from '../components/MyPasswordInput';

function DeleteUserPage() {
  const { deleteCurrentUser, reauthenticateUser, getErrorMessage } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(values) {
    try {
      toast.dismiss();
      await reauthenticateUser(values.password);
      await deleteCurrentUser();
      toast.success('The user has been deleted');
      navigate('..');
    } catch (error) {
      const message = getErrorMessage(error.code);
      toast.error(message);
    }
  }

  return (
    <div>
      <div className="rounded-md border border-gray-300 p-6">
        <h1 className="text-center text-4xl font-semibold">Delete User</h1>
        <Formik
          initialValues={{
            password: '',
          }}
          onSubmit={onSubmit}
          validationSchema={deleteUserSchema}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <MyPasswordInput label="Password" id="password" name="password" />
              <button
                type="submit"
                className="block w-full rounded-md bg-red-600 p-3 font-semibold text-gray-100 outline-none transition-colors disabled:bg-opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Deleting User...' : 'Delete User'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <p className="mt-8 text-center">
        <Link to=".." className="text-indigo-600">
          Cancel
        </Link>
      </p>
    </div>
  );
}

export default DeleteUserPage;
