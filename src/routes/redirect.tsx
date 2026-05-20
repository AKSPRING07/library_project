import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import { AIParticles } from "@/components/ai-particles";

type Role = "admin" | "librarian" | "student" | "scholar";

export const Route = createFileRoute("/redirect")({
  validateSearch: (s: Record<string, unknown>): { role: Role } => ({
    role: (s.role as Role) ?? "student",
  }),
  component: RedirectPage,
});

const target: Record<Role, string> = {
  admin: "/dashboard/admin",
  librarian: "/dashboard/librarian",
  student: "/dashboard/student",
  scholar: "/dashboard/scholar",
};

const label: Record<Role, string> = {
  admin: "Admin",
  librarian: "Librarian",
  student: "Student",
  scholar: "Research Scholar",
};

function RedirectPage() {
  const { role } = Route.useSearch() as { role: Role };
  const navigate = useNavigate();


  useEffect(() => {
    const t = setTimeout(() => navigate({ to: target[role] }), 1700);
    return () => clearTimeout(t);
  }, [role, navigate]);

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-hero">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <AIParticles count={36} />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md text-center"
      >
        <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-neon-gradient shadow-glow animate-pulse-glow">
          <ShieldCheck className="h-7 w-7 text-neon-foreground" />
        </div>
        <h1 className="font-display text-2xl font-semibold">Securing your session…</h1>
        <p className="mt-2 text-sm text-muted-foreground">Redirecting to your {label[role]} dashboard</p>

        <div className="mx-auto mt-8 h-1 w-64 overflow-hidden rounded-full bg-white/10">
          <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 1.6, ease: "easeInOut" }} className="h-full w-1/2 rounded-full bg-neon-gradient" />
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {["Verifying", "Loading workspace", "Personalizing"].map((s, i) => (
            <motion.div key={s} initial={{ opacity: 0.2 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.4 }} className="rounded-md glass py-2">
              {s}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
