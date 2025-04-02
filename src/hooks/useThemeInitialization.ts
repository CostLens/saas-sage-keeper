
import { useEffect } from 'react';

export function useThemeInitialization() {
  useEffect(() => {
    if (localStorage.getItem("dark-theme-enabled") === null) {
      localStorage.setItem("dark-theme-enabled", "false");
    }
    
    const darkThemeEnabled = localStorage.getItem("dark-theme-enabled") === "true";
    if (darkThemeEnabled) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
}
