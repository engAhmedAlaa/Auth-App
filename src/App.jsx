import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import AuthRequired from './components/AuthRequired';
import HomePage from './pages/HomePage';
import UpdateProfilePage from './pages/UpdateProfilePage';
import DeleteUserPage from './pages/DeleteUserPage';
import AuthDenied from './components/AuthDenied';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import ForgetPassword from './pages/ForgetPassword';
import UserManagement from './pages/UserManagement';
import ResetPasswordPage from './pages/ResetPasswordPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <AuthRequired />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: 'update-profile',
            element: <UpdateProfilePage />,
          },
          {
            path: 'delete-user',
            element: <DeleteUserPage />,
          },
        ],
      },
      {
        element: <AuthDenied />,
        children: [
          {
            path: 'login',
            element: <LogInPage />,
          },
          {
            path: 'forget-password',
            element: <ForgetPassword />,
          },
          {
            path: 'signup',
            element: <SignUpPage />,
          },
        ],
      },
      {
        element: <UserManagement />,
        path: 'user-management',
        children: [
          {
            path: 'reset-password',
            element: <ResetPasswordPage />,
          },
          {
            path: 'verify-email',
            element: <VerifyEmailPage />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

// TODO Using Regex to handle error
// TODO Using React Query
// TODO Using Formik
// TODO Using Button instead of Formik
// TODO Tailwind
// TODO Icones
// TODO Continue URL (sendPasswordResetEmail, sendEmailVerification)
// TODO Delete and set password for a user who signed in with a Provider like GoogleProvider

export default App;
