import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BookOpenCheck, Sparkles, Brain, Library } from "lucide-react";
import { AIParticles } from "./ai-particles";

export function AuthShell({ children, headline, subheadline }: { children: React.ReactNode; headline: string; subheadline: string }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-hero">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <AIParticles />

      <div className="relative grid min-h-screen lg:grid-cols-2">
        {/* Left visual side */}
        <div className="relative hidden flex-col justify-between p-10 lg:flex">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-neon-gradient shadow-glow">
              <BookOpenCheck className="h-5 w-5 text-neon-foreground" />
            </div>
            <span className="font-display text-xl font-semibold">Lumina<span className="text-neon">.</span></span>
          </Link>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative max-w-md"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-neon">
                <Sparkles className="h-3 w-3" /> AI Knowledge OS
              </div>
              <h1 className="font-display text-4xl font-semibold leading-tight text-gradient">
                {headline}
              </h1>
              <p className="mt-4 text-muted-foreground">{subheadline}</p>

              <div className="mt-10 grid grid-cols-2 gap-3">
                <FloatingStat icon={<Brain className="h-4 w-4" />} label="AI accuracy" value="98.4%" />
                <FloatingStat icon={<Library className="h-4 w-4" />} label="Books indexed" value="1.2M+" />
              </div>
            </motion.div>

            {/* glow */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-neon/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-primary/40 blur-3xl" />
          </div>

          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Lumina Systems. Built for tomorrow's libraries.</p>
        </div>

        {/* Right form side */}
        <div className="relative flex items-center justify-center p-6 sm:p-10">
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function FloatingStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="glass-strong rounded-xl p-3"
    >
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="text-neon">{icon}</span>
        {label}
      </div>
      <div className="mt-1 font-display text-lg font-semibold">{value}</div>
    </motion.div>
  );
}
