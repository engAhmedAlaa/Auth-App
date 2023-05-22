import { Link } from 'react-router-dom';

function Footer() {
  const date = new Date();
  const years = date.getFullYear();

  return (
    <footer className="mt-8 border border-gray-300 dark:border-white/20 rounded-md px-6 py-4">
      <p className="text-center">
        &copy; {years}{' '}
        <Link to="/" className="text-indigo-600">
          Auth App
        </Link>
        , Coded by{' '}
        <a
          href="https://github.com/engAhmedAlaa"
          target="_blank"
          rel="noreferrer"
          className="text-indigo-600"
        >
          Ahmed Alaa
        </a>
        .
      </p>
    </footer>
  );
}

export default Footer;
