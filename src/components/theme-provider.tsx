import { createContext, useContext, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";
const ThemeCtx = createContext<{ theme: Theme; toggle: () => void; set: (t: Theme) => void }>({
  theme: "dark",
  toggle: () => {},
  set: () => {},
});

const STORAGE_KEY = "lumina-theme";

function apply(theme: Theme) {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  html.classList.remove("light", "dark");
  html.classList.add(theme);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && (localStorage.getItem(STORAGE_KEY) as Theme | null)) || null;
    const prefers = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    const initial: Theme = stored ?? prefers;
    setTheme(initial);
    apply(initial);
  }, []);

  const set = (t: Theme) => {
    setTheme(t);
    apply(t);
    try { localStorage.setItem(STORAGE_KEY, t); } catch {}
  };
  const toggle = () => set(theme === "dark" ? "light" : "dark");

  return <ThemeCtx.Provider value={{ theme, toggle, set }}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={`relative grid h-9 w-9 place-items-center rounded-xl glass transition hover:border-neon/40 ${className}`}
    >
      <Sun className={`absolute h-4 w-4 transition-all ${isDark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"}`} />
      <Moon className={`absolute h-4 w-4 transition-all ${isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"}`} />
    </button>
  );
}
