import React, { createContext, useContext, useState, useEffect } from 'react';
import AppColors from '../constants/colors';

export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  isDark: boolean;
  background: string;
  surface: string;
  surfaceCard: string;
  surfaceSubtle: string;
  surfaceInput: string;
  border: string;
  borderLight: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  primary: string;
  primaryContainer: string;
  secondary: string;
  secondaryBright: string;
  tertiary: string;
  sand: string;
  shadow: string;
  statusPillBg: string;
  statusPillText: string;
}

export const lightColors: ThemeColors = {
  isDark: false,
  background: '#FEF9EF',
  surface: '#FEF9EF',
  surfaceCard: '#FFFFFF',
  surfaceSubtle: '#FAF8F5',
  surfaceInput: '#FAF8F5',
  border: '#E6DEC8',
  borderLight: '#EFEAE0',
  textPrimary: '#1D1C16',
  textSecondary: '#414843',
  textMuted: '#727973',
  primary: '#002214',
  primaryContainer: '#163828',
  secondary: '#B7160A',
  secondaryBright: '#D83120',
  tertiary: '#E69D1E',
  sand: '#EFEAE0',
  shadow: 'rgba(22, 56, 40, 0.08)',
  statusPillBg: '#EFEAE0',
  statusPillText: '#2C4D3C',
};

export const darkColors: ThemeColors = {
  isDark: true,
  background: '#0E1411',
  surface: '#121A15',
  surfaceCard: '#19241E',
  surfaceSubtle: '#141E18',
  surfaceInput: '#17221A',
  border: '#26382E',
  borderLight: '#203027',
  textPrimary: '#F4F7F4',
  textSecondary: '#B9C5BD',
  textMuted: '#84958A',
  primary: '#2F6849',
  primaryContainer: '#1F4732',
  secondary: '#E84535',
  secondaryBright: '#FA5848',
  tertiary: '#F5B038',
  sand: '#1C2921',
  shadow: 'rgba(0, 0, 0, 0.45)',
  statusPillBg: '#213328',
  statusPillText: '#84D8A7',
};

interface ThemeContextType {
  theme: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  colors: lightColors,
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('barodago_theme');
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem('barodago_theme', next);
      } catch {}
      return next;
    });
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    try {
      localStorage.setItem('barodago_theme', mode);
    } catch {}
  };

  const colors = theme === 'dark' ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
