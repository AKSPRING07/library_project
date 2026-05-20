import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Shield, BookMarked, GraduationCap, Microscope, ArrowRight, Loader2, CheckCircle2, ArrowLeft } from "lucide-react";
import { AuthShell } from "@/components/auth-shell";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
  head: () => ({
    meta: [
      { title: "Create account — Lumina" },
      { name: "description", content: "Create your Lumina account and choose your role." },
    ],
  }),
});

type Role = "admin" | "librarian" | "student" | "scholar";

const roleCards: { id: Role; icon: any; title: string; desc: string }[] = [
  { id: "admin", icon: Shield, title: "Admin", desc: "Govern the institution-wide library platform." },
  { id: "librarian", icon: BookMarked, title: "Librarian", desc: "Manage catalog, loans, and acquisitions." },
  { id: "student", icon: GraduationCap, title: "Student", desc: "Discover, borrow, and learn faster." },
  { id: "scholar", icon: Microscope, title: "Research Scholar", desc: "Access journals and citation graphs." },
];

function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate({ to: "/redirect", search: { role: role ?? "student" } }), 700);
    }, 1100);
  }

  return (
    <AuthShell
      headline="Join the Intelligent Library Network"
      subheadline="Pick your role and tailor your workspace in seconds. Every role unlocks its own AI-driven workflow."
    >
      <div className="glass-strong rounded-3xl p-8 shadow-elevated">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold">{step === 1 ? "Choose your role" : `Sign up as ${roleCards.find(r => r.id === role)?.title}`}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{step === 1 ? "Your role customizes everything." : "Tell us about yourself."}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`h-1.5 w-6 rounded-full ${step >= 1 ? "bg-neon" : "bg-white/10"}`} />
            <span className={`h-1.5 w-6 rounded-full ${step >= 2 ? "bg-neon" : "bg-white/10"}`} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              <div className="grid grid-cols-2 gap-3">
                {roleCards.map((r) => {
                  const active = role === r.id;
                  return (
                    <motion.button
                      key={r.id}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setRole(r.id)}
                      className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition ${active ? "border-neon/60 bg-neon/10 shadow-glow" : "border-white/10 bg-white/5 hover:border-white/20"}`}
                    >
                      <div className={`grid h-9 w-9 place-items-center rounded-xl ${active ? "bg-neon-gradient text-neon-foreground" : "bg-white/5 text-neon ring-1 ring-white/10"}`}>
                        <r.icon className="h-4 w-4" />
                      </div>
                      <div className="mt-3 font-display text-sm font-semibold">{r.title}</div>
                      <p className="mt-1 text-xs text-muted-foreground">{r.desc}</p>
                      {active && (
                        <motion.div layoutId="role-check" className="absolute right-3 top-3 text-neon">
                          <CheckCircle2 className="h-4 w-4" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <button
                disabled={!role}
                onClick={() => setStep(2)}
                className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-neon-gradient font-medium text-neon-foreground shadow-glow transition disabled:opacity-50"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>

              <p className="pt-2 text-center text-xs text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-neon hover:underline">Sign in</Link>
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="step2"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
              onSubmit={onSubmit}
              className="space-y-4"
            >
              <RoleFields role={role!} />

              <motion.button
                whileTap={{ scale: 0.98 }}
                disabled={loading || success}
                type="submit"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-neon-gradient font-medium text-neon-foreground shadow-glow transition disabled:opacity-80"
              >
                {success ? (<><CheckCircle2 className="h-4 w-4" /> Account created</>) : loading ? (<><Loader2 className="h-4 w-4 animate-spin" /> Creating account…</>) : "Create account"}
              </motion.button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex w-full items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Change role
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </AuthShell>
  );
}

function RoleFields({ role }: { role: Role }) {
  const sets: Record<Role, { label: string; type?: string; placeholder?: string }[]> = {
    admin: [
      { label: "Full name", placeholder: "Jane Doe" },
      { label: "Institution", placeholder: "Lumina University" },
      { label: "Admin code", placeholder: "ADM-•••••" },
      { label: "Email", type: "email", placeholder: "admin@institution.edu" },
      { label: "Password", type: "password", placeholder: "••••••••" },
    ],
    librarian: [
      { label: "Employee ID", placeholder: "EMP-00421" },
      { label: "Department", placeholder: "Central Library" },
      { label: "Contact number", placeholder: "+1 555 0100" },
      { label: "Email", type: "email", placeholder: "librarian@institution.edu" },
      { label: "Password", type: "password", placeholder: "••••••••" },
    ],
    student: [
      { label: "Full name", placeholder: "Alex Carter" },
      { label: "Student ID", placeholder: "STU-2027-001" },
      { label: "Department", placeholder: "Computer Science" },
      { label: "Institution", placeholder: "Lumina University" },
      { label: "Email", type: "email", placeholder: "alex@university.edu" },
      { label: "Password", type: "password", placeholder: "••••••••" },
    ],
    scholar: [
      { label: "Research domain", placeholder: "Quantum Computing" },
      { label: "Institution", placeholder: "Lumina Research Lab" },
      { label: "Research ID", placeholder: "RES-2024-118" },
      { label: "Email", type: "email", placeholder: "scholar@research.org" },
      { label: "Password", type: "password", placeholder: "••••••••" },
    ],
  };

  return (
    <motion.div
      key={role}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid gap-3 sm:grid-cols-2"
    >
      {sets[role].map((f, i) => (
        <label key={i} className={`block ${i === sets[role].length - 1 || f.type === "email" ? "sm:col-span-2" : ""}`}>
          <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{f.label}</span>
          <input
            type={f.type ?? "text"}
            placeholder={f.placeholder}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none transition focus:border-neon/50 focus:ring-2 focus:ring-neon/20 placeholder:text-muted-foreground/60"
          />
        </label>
      ))}
    </motion.div>
  );
}
