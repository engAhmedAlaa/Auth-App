import { Link } from 'react-router-dom';
import { LogosFirebase } from './Icons';
import ThemeButton from './ThemeButton';

function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="select-none" translate="no">
        <Link to="." className="text-4xl flex items-center gap-x-4 font-bold">
          <LogosFirebase /> Auth App
        </Link>
      </div>
      <ThemeButton />
    </header>
  );
}

export default Header;
