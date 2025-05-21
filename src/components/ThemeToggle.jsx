import { useEffect } from "react";
import { Moon, Trees } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "hidden md:flex items-center justify-center p-2 rounded-full",
        "transition-colors duration-300 focus:outline-hidden",
        "hover:bg-primary/10 ml-8"
      )}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Trees className="h-5 w-5 text-green-700" />
      ) : (
        <Moon className="h-5 w-5 text-blue-700" />
      )}
    </button>
  );
};
