import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { AuthShell } from "@/components/auth-shell";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Sign in — Lumina" },
      { name: "description", content: "Sign in to your Lumina AI library workspace." },
    ],
  }),
});

type Role = "librarian" | "student" | "staff";

function LoginPage() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const session = localStorage.getItem("lumina_session");
    if (session) {
      try {
        const parsed = JSON.parse(session);
        if (parsed.loggedIn && parsed.role) {
          navigate({ to: `/dashboard/${parsed.role}` });
        }
      } catch (err) {}
    }
  }, [navigate]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in both fields."); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      localStorage.setItem("lumina_session", JSON.stringify({ loggedIn: true, role, email }));
      setTimeout(() => navigate({ to: "/redirect", search: { role } }), 700);
    }, 1100);
  }

  return (
    <AuthShell
      headline="Welcome Back to the Future of Smart Library Management"
      subheadline="Sign in to your personalized knowledge workspace and pick up exactly where you left off."
    >
      <div className="glass-strong rounded-3xl p-8 shadow-elevated">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-semibold">Sign in</h2>
          <p className="mt-1 text-sm text-muted-foreground">Access your Lumina workspace.</p>
        </div>

        {/* role selector */}
        <div className="mb-5 grid grid-cols-3 gap-1 rounded-xl bg-white/5 p-1 text-xs">
          {(["librarian", "student", "staff"] as Role[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`rounded-lg px-2 py-1.5 capitalize transition ${role === r ? "bg-neon-gradient text-neon-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {r}
            </button>
          ))}
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <Field
            icon={<Mail className="h-4 w-4" />}
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@institution.edu"
          />
          <Field
            icon={<Lock className="h-4 w-4" />}
            label="Password"
            type={showPwd ? "text" : "password"}
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
            trailing={
              <button type="button" onClick={() => setShowPwd((v) => !v)} className="text-muted-foreground hover:text-foreground">
                {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
          />

          <div className="flex items-center justify-between text-xs">
            <label className="flex cursor-pointer items-center gap-2 text-muted-foreground">
              <input type="checkbox" className="h-3.5 w-3.5 accent-[color:var(--neon)]" /> Remember me
            </label>
            <a href="#" className="text-neon hover:underline">Forgot password?</a>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive-foreground">
              <AlertCircle className="h-3.5 w-3.5" /> {error}
            </motion.div>
          )}

          <motion.button
            whileTap={{ scale: 0.98 }}
            disabled={loading || success}
            type="submit"
            className="relative flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-neon-gradient font-medium text-neon-foreground shadow-glow transition disabled:opacity-80"
          >
            {success ? (<><CheckCircle2 className="h-4 w-4" /> Signed in</>) : loading ? (<><Loader2 className="h-4 w-4 animate-spin" /> Signing in…</>) : "Sign in"}
          </motion.button>

          <div className="relative my-2 flex items-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <div className="flex-1 border-t border-white/10" />
            <span className="px-3">or continue with email</span>
            <div className="flex-1 border-t border-white/10" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <SocialButton provider="Google" />
            <SocialButton provider="Microsoft" />
          </div>

          <p className="pt-2 text-center text-xs text-muted-foreground">
            New to Lumina?{" "}
            <Link to="/register" className="text-neon hover:underline">Create an account</Link>
          </p>
        </form>
      </div>
    </AuthShell>
  );
}

function Field({
  icon, label, type, value, onChange, placeholder, trailing,
}: { icon: React.ReactNode; label: string; type: string; value: string; onChange: (v: string) => void; placeholder?: string; trailing?: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      <div className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 transition focus-within:border-neon/50 focus-within:ring-2 focus-within:ring-neon/20">
        <span className="text-muted-foreground group-focus-within:text-neon">{icon}</span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
        />
        {trailing}
      </div>
    </label>
  );
}

function SocialButton({ provider }: { provider: "Google" | "Microsoft" }) {
  return (
    <button
      type="button"
      className="group flex h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 text-sm transition hover:border-neon/30 hover:bg-white/10 hover:shadow-glow"
    >
      {provider === "Google" ? <GoogleIcon /> : <MicrosoftIcon />}
      <span>{provider}</span>
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4-5.5 4-3.3 0-6-2.7-6-6.1S8.7 5.9 12 5.9c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.4 14.6 2.5 12 2.5 6.8 2.5 2.6 6.7 2.6 12s4.2 9.5 9.4 9.5c5.4 0 9-3.8 9-9.2 0-.6-.1-1.1-.2-1.6H12z"/></svg>
  );
}
function MicrosoftIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#F25022" d="M3 3h8v8H3z"/><path fill="#7FBA00" d="M13 3h8v8h-8z"/><path fill="#00A4EF" d="M3 13h8v8H3z"/><path fill="#FFB900" d="M13 13h8v8h-8z"/></svg>
  );
}
