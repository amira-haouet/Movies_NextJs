"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Monitor } from "lucide-react";

export default function ThemeToggle(): JSX.Element {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system";
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Par défaut : mode system
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = systemPrefersDark ? "dark" : "light";
      applyTheme(initialTheme);
      setTheme("system");
    }
  }, []);

  const applyTheme = (mode: "light" | "dark" | "system") => {
    if (mode === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else if (mode === "light") {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    } else {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (systemPrefersDark) {
        document.body.classList.add("dark");
        document.body.classList.remove("light");
      } else {
        document.body.classList.add("light");
        document.body.classList.remove("dark");
      }
    }
  };

  const toggleTheme = (): void => {
    let nextTheme: "light" | "dark" | "system";
    if (theme === "light") {
      nextTheme = "dark";
    } else if (theme === "dark") {
      nextTheme = "system";
    } else {
      nextTheme = "light";
    }
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded shadow-md flex items-center justify-center"
    >
      {theme === "light" && <Sun className="w-5 h-5 text-yellow-500" />}
      {theme === "dark" && <Moon className="w-5 h-5 text-blue-500" />}
      {theme === "system" && <Monitor className="w-5 h-5 text-gray-500" />}
    </button>
  );
}
