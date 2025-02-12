// src/DarkModeContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a context for dark mode
const DarkModeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

// Create a provider component
export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize state from local storage or default to false
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    // Store the user's preference in local storage
    localStorage.setItem('darkMode', String(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useDarkMode = () => {
  return useContext(DarkModeContext);
};
