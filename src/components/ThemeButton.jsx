import { useTheme } from '../contexts/ThemeContext';
import { IonSunny, PhMoonStarsFill } from './Icons';

function ThemeButton() {
  const { theme, handleToggleTheme } = useTheme();

  return (
    <button
      className="text-3xl"
      onClick={handleToggleTheme}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <IonSunny className="text-yellow-500" />
      ) : (
        <PhMoonStarsFill className="text-slate-900" />
      )}
    </button>
  );
}

export default ThemeButton;
