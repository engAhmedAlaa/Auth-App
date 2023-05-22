import { Outlet } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '../contexts/ThemeContext';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  const { theme } = useTheme();

  return (
    <>
      <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center p-4 text-lg">
        <Header />
        <main className="mt-8">
          <Outlet />
        </main>
        <Footer />
      </div>
      <ToastContainer
        position="bottom-center"
        theme={theme === 'dark' ? 'light' : 'dark'}
        transition={Zoom}
        limit="2"
      />
    </>
  );
}

export default Layout;
