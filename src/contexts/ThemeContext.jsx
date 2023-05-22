import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

function getTheme() {
  if (localStorage.getItem('theme')) return localStorage.getItem('theme');
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getTheme);

  function handleToggleTheme() {
    setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'));
  }

  document.documentElement.className = theme === 'dark' ? 'dark' : '';

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const value = {
    theme,
    handleToggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
