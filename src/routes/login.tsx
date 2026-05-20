import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, Loader2, CheckCircle2, AlertCircle, X } from "lucide-react";
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

interface SocialAccount {
  name: string;
  email: string;
  avatar: string;
}

const googleAccounts: SocialAccount[] = [
  { name: "Alex Carter", email: "alex.carter@gmail.com", avatar: "AC" },
  { name: "Priya Sharma", email: "priya.sharma@gmail.com", avatar: "PS" },
  { name: "Jordan Lee", email: "jordan.lee@gmail.com", avatar: "JL" },
];

const microsoftAccounts: SocialAccount[] = [
  { name: "Alex Carter", email: "alex.carter@outlook.com", avatar: "AC" },
  { name: "Sam Wilson", email: "sam.wilson@outlook.com", avatar: "SW" },
  { name: "Taylor Reed", email: "taylor.reed@live.com", avatar: "TR" },
];

function LoginPage() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [socialPicker, setSocialPicker] = useState<"Google" | "Microsoft" | null>(null);
  const [socialLoading, setSocialLoading] = useState(false);

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

  function handleSocialAccountSelect(account: SocialAccount) {
    setSocialLoading(true);
    setTimeout(() => {
      setSocialLoading(false);
      setSocialPicker(null);
      setSuccess(true);
      localStorage.setItem(
        "lumina_session",
        JSON.stringify({ loggedIn: true, role, email: account.email, name: account.name, provider: socialPicker })
      );
      setTimeout(() => navigate({ to: "/redirect", search: { role } }), 700);
    }, 1200);
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
            <span className="px-3">or continue with</span>
            <div className="flex-1 border-t border-white/10" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setSocialPicker("Google")}
              className="group flex h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 text-sm transition hover:border-neon/30 hover:bg-white/10 hover:shadow-glow"
            >
              <GoogleIcon />
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={() => setSocialPicker("Microsoft")}
              className="group flex h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 text-sm transition hover:border-neon/30 hover:bg-white/10 hover:shadow-glow"
            >
              <MicrosoftIcon />
              <span>Microsoft</span>
            </button>
          </div>

          <p className="pt-2 text-center text-xs text-muted-foreground">
            New to Lumina?{" "}
            <Link to="/register" className="text-neon hover:underline">Create an account</Link>
          </p>
        </form>
      </div>

      {/* Social Account Picker Modal */}
      <AnimatePresence>
        {socialPicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => !socialLoading && setSocialPicker(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: "spring", damping: 22, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#1a1a1a] p-6 shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  {socialPicker === "Google" ? (
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-white">
                      <GoogleIcon size={22} />
                    </div>
                  ) : (
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-white">
                      <MicrosoftIcon size={22} />
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-semibold text-white">Sign in with {socialPicker}</h3>
                    <p className="text-[11px] text-white/50">Choose an account to continue</p>
                  </div>
                </div>
                <button
                  onClick={() => !socialLoading && setSocialPicker(null)}
                  className="grid h-8 w-8 place-items-center rounded-lg text-white/40 hover:bg-white/10 hover:text-white transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Account List */}
              <div className="space-y-2">
                {(socialPicker === "Google" ? googleAccounts : microsoftAccounts).map((account) => (
                  <button
                    key={account.email}
                    onClick={() => handleSocialAccountSelect(account)}
                    disabled={socialLoading}
                    className="flex w-full items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3 text-left transition hover:border-neon/30 hover:bg-white/10 disabled:opacity-50 disabled:cursor-wait"
                  >
                    <div
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-bold text-white ${
                        socialPicker === "Google"
                          ? "bg-gradient-to-br from-blue-500 to-red-500"
                          : "bg-gradient-to-br from-[#00A4EF] to-[#7FBA00]"
                      }`}
                    >
                      {account.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-white truncate">{account.name}</div>
                      <div className="text-[11px] text-white/50 truncate">{account.email}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Loading state */}
              {socialLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-neon/20 bg-neon/5 py-2.5 text-xs text-neon"
                >
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Signing in with {socialPicker}…
                </motion.div>
              )}

              {/* Use another account */}
              {!socialLoading && (
                <div className="mt-4 border-t border-white/10 pt-3">
                  <p className="text-center text-[11px] text-white/40">
                    Don't see your account?{" "}
                    <button
                      onClick={() => setSocialPicker(null)}
                      className="text-neon hover:underline"
                    >
                      Use a different account
                    </button>
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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

function GoogleIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.0 24.0 0 0 0 0 21.56l7.98-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

function MicrosoftIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 23 23">
      <path fill="#F25022" d="M1 1h10v10H1z"/>
      <path fill="#7FBA00" d="M12 1h10v10H12z"/>
      <path fill="#00A4EF" d="M1 12h10v10H1z"/>
      <path fill="#FFB900" d="M12 12h10v10H12z"/>
    </svg>
  );
}

