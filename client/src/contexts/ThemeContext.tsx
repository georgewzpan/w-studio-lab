/**
 * W Studio Lab — ThemeContext
 * Manages three color themes: A (黑金), B (克莱因蓝+橙), C (蒂凡尼绿)
 * and the dark/light mode for shadcn compatibility.
 */
import React, { createContext, useContext, useEffect, useState } from "react";

export type ColorTheme = "a" | "b" | "c";
type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  colorTheme: ColorTheme;
  setColorTheme: (t: ColorTheme) => void;
  toggleTheme?: () => void;
  switchable: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  switchable = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [colorTheme, setColorThemeState] = useState<ColorTheme>("a");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", colorTheme);
    // Theme A (黑金) and B (深海蓝橙) are dark; Theme C (蒂凡尼绿) is light
    if (colorTheme === "c") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, [colorTheme]);

  const setColorTheme = (t: ColorTheme) => {
    setColorThemeState(t);
  };

  const toggleTheme = switchable
    ? () => setTheme((prev) => (prev === "light" ? "dark" : "light"))
    : undefined;

  return (
    <ThemeContext.Provider value={{ theme, colorTheme, setColorTheme, toggleTheme, switchable }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
