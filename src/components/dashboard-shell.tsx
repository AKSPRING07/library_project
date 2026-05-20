import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  BookOpenCheck, LayoutDashboard, Library, Users, BarChart3, Settings, Bell, Search, Bot, LogOut, Sparkles,
} from "lucide-react";
import { AIParticles } from "./ai-particles";

export function DashboardShell({
  title, role, children, accent,
}: { title: string; role: string; children: React.ReactNode; accent?: string }) {
  const [chatOpen, setChatOpen] = useState(false);

  const nav = [
    { icon: LayoutDashboard, label: "Overview" },
    { icon: Library, label: "Catalog" },
    { icon: Users, label: "Readers" },
    { icon: BarChart3, label: "Analytics" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <div className="relative min-h-screen bg-hero text-foreground">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <AIParticles count={14} />
      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-white/5 bg-deep/40 p-4 lg:block">
          <Link to="/" className="mb-8 flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-neon-gradient shadow-glow">
              <BookOpenCheck className="h-4 w-4 text-neon-foreground" />
            </div>
            <span className="font-display text-lg font-semibold">Lumina<span className="text-neon">.</span></span>
          </Link>
          <nav className="space-y-1">
            {nav.map((n, i) => (
              <button key={n.label} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${i === 0 ? "bg-white/10 text-foreground" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"}`}>
                <n.icon className="h-4 w-4" /> {n.label}
              </button>
            ))}
          </nav>

          <div className="mt-8 rounded-xl glass p-3">
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Signed in as</div>
            <div className="mt-0.5 text-sm font-medium">{role}</div>
            <Link to="/login" className="mt-3 flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"><LogOut className="h-3.5 w-3.5" /> Sign out</Link>
          </div>
        </aside>

        <main className="flex-1">
          {/* Top bar */}
          <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-white/5 bg-deep/50 px-6 py-3 backdrop-blur">
            <div className="flex flex-1 items-center gap-2 rounded-xl glass px-3 py-2 text-xs">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input placeholder="Ask Lumi anything — books, readers, insights…" className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60" />
              <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-muted-foreground">⌘K</span>
            </div>
            <button className="relative grid h-9 w-9 place-items-center rounded-xl glass">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-neon" />
            </button>
          </header>

          {/* Content */}
          <div className="p-6">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-neon">
                    <Sparkles className="h-3 w-3" /> {accent ?? "AI workspace"}
                  </div>
                  <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">{title}</h1>
                  <p className="mt-1 text-sm text-muted-foreground">Real-time view of your {role.toLowerCase()} workspace.</p>
                </div>
              </div>

              <div className="mt-6">{children}</div>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Floating chatbot */}
      <div className="fixed bottom-6 right-6 z-30">
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mb-3 w-80 rounded-2xl glass-strong p-3 shadow-elevated"
          >
            <div className="flex items-center gap-2 border-b border-white/10 pb-2">
              <div className="grid h-7 w-7 place-items-center rounded-lg bg-neon-gradient"><Bot className="h-3.5 w-3.5 text-neon-foreground" /></div>
              <div>
                <div className="text-sm font-medium">Lumi Assistant</div>
                <div className="text-[10px] text-neon">online</div>
              </div>
            </div>
            <div className="mt-3 space-y-2 text-xs">
              <div className="rounded-lg bg-white/5 p-2 text-muted-foreground">How can I help today?</div>
              <div className="rounded-lg bg-neon/10 p-2">Try: "Top 5 books overdue this week"</div>
            </div>
            <input placeholder="Type a message…" className="mt-3 w-full rounded-lg bg-white/5 px-3 py-2 text-xs outline-none placeholder:text-muted-foreground/60" />
          </motion.div>
        )}
        <button
          onClick={() => setChatOpen((v) => !v)}
          className="grid h-14 w-14 place-items-center rounded-2xl bg-neon-gradient text-neon-foreground shadow-glow animate-pulse-glow"
          aria-label="Open assistant"
        >
          <Bot className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

export function StatCard({ label, value, delta, icon: Icon }: { label: string; value: string; delta?: string; icon: any }) {
  return (
    <motion.div whileHover={{ y: -3 }} className="rounded-2xl glass p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-neon"><Icon className="h-4 w-4" /></span>
      </div>
      <div className="mt-2 font-display text-2xl font-semibold">{value}</div>
      {delta && <div className="mt-1 text-xs text-neon">{delta}</div>}
    </motion.div>
  );
}
