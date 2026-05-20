import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X, BookOpenCheck } from "lucide-react";
import { ThemeToggle } from "@/components/theme-provider";

const links = [
  { label: "Home", to: "/" },
  { label: "Features", to: "/#features" },
  { label: "Solutions", to: "/#solutions" },
  { label: "Analytics", to: "/#analytics" },
  { label: "Contact", to: "/#contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "py-2" : "py-4"}`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all ${scrolled ? "glass-strong shadow-elevated" : "glass"}`}>
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-neon-gradient shadow-glow">
              <BookOpenCheck className="h-5 w-5 text-neon-foreground" />
            </div>
            <span className="font-display text-lg font-semibold tracking-tight">Lumina<span className="text-neon">.</span></span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.to}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <Link to="/login" className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground">
              Login
            </Link>
            <Link
              to="/register"
              className="group relative overflow-hidden rounded-lg bg-neon-gradient px-4 py-2 text-sm font-medium text-neon-foreground shadow-glow transition hover:scale-[1.02]"
            >
              Get Started
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button onClick={() => setOpen((v) => !v)} aria-label="Menu" className="grid h-9 w-9 place-items-center rounded-xl glass">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 rounded-2xl glass-strong p-4 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <a key={l.label} href={l.to} className="rounded-lg px-3 py-2 text-sm hover:bg-white/5" onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link to="/login" className="rounded-lg border border-white/10 px-3 py-2 text-center text-sm">Login</Link>
                <Link to="/register" className="rounded-lg bg-neon-gradient px-3 py-2 text-center text-sm text-neon-foreground">Get Started</Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
