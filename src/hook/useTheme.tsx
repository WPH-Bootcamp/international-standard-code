import React, { useEffect } from 'react';

const useTheme = () => {
  const [theme, setTheme] = React.useState(
    localStorage.getItem('theme') || 'light',
  );

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  return {
    theme,
    toggleTheme,
  };
};

export default useTheme;
