import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, Sparkles, Bot, Activity, CalendarCheck, Radio, BookOpen, BarChart3, Bell, Brain,
  ShieldCheck, Search, Library, TrendingUp, Quote,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { AIParticles } from "@/components/ai-particles";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Lumina — AI Smart Library Management System" },
      { name: "description", content: "An intelligent operating system for modern libraries. Discovery, circulation, and analytics unified by adaptive AI." },
      { property: "og:title", content: "Lumina — AI Smart Library Management" },
      { property: "og:description", content: "Enterprise AI library OS with smart recommendations, RFID, analytics, and a built-in chatbot." },
    ],
  }),
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <Hero />
      <Bento />
      <Solutions />
      <Testimonial />
      <CTA />
      <Footer />
    </div>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero pt-32 pb-16">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <AIParticles count={18} />
      <div className="pointer-events-none absolute -top-32 left-1/4 h-[500px] w-[800px] rounded-full bg-primary/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-neon/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-neon">
            <Sparkles className="h-3 w-3" /> Adaptive AI · Built for institutions
          </div>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-gradient">AI-Powered Smart</span>
            <br />
            Library Management
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Transforming traditional libraries into intelligent digital knowledge
            ecosystems — predictive, connected, beautifully unified.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link to="/register" className="group inline-flex items-center gap-2 rounded-xl bg-neon-gradient px-5 py-3 text-sm font-medium text-neon-foreground shadow-glow transition hover:scale-[1.02]">
              Get Started <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link to="/login" className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/40 px-5 py-3 text-sm font-medium backdrop-blur transition hover:bg-background/70">
              Login
            </Link>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-muted-foreground transition hover:text-foreground">
              Request Demo →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Bento ---------------- */

function Bento() {
  return (
    <section id="features" className="relative py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-neon">
              <Sparkles className="h-3 w-3" /> Capabilities
            </div>
            <h2 className="mt-3 max-w-xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              One platform. <span className="text-gradient">Every workflow.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            A bento of intelligent modules — each works alone, all sing together.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid auto-rows-[180px] grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">

          {/* Dashboard mock — large */}
          <Cell className="col-span-2 row-span-2 md:col-span-3 lg:col-span-4">
            <DashboardMock />
          </Cell>

          {/* AI chatbot */}
          <Cell className="col-span-2 row-span-2 md:col-span-1 lg:col-span-2">
            <ChatbotMock />
          </Cell>

          {/* Stat */}
          <Cell className="col-span-1 row-span-1 lg:col-span-2">
            <BigStat label="Engagement lift" value="+38%" caption="across 400+ campuses" icon={TrendingUp} />
          </Cell>

          {/* Recommendation */}
          <Cell className="col-span-1 row-span-1 lg:col-span-2">
            <Feature icon={Brain} title="AI Recommendations" desc="Neural ranking on reader behaviour." />
          </Cell>

          {/* RFID */}
          <Cell className="col-span-2 row-span-1 lg:col-span-2">
            <Feature icon={Radio} title="RFID Integration" desc="Tag, scan, audit — zero touch hardware." />
          </Cell>

          {/* Reservation */}
          <Cell className="col-span-1 row-span-1">
            <Feature icon={CalendarCheck} title="Auto Reservations" desc="Predictive holds." compact />
          </Cell>
          {/* Tracking */}
          <Cell className="col-span-1 row-span-1">
            <Feature icon={Activity} title="Live Tracking" desc="Real-time circulation." compact />
          </Cell>

          {/* Analytics chart */}
          <Cell className="col-span-2 row-span-2 lg:col-span-2">
            <AnalyticsChart />
          </Cell>

          {/* Notifications */}
          <Cell className="col-span-1 row-span-1">
            <Feature icon={Bell} title="Smart Alerts" desc="Context-aware." compact />
          </Cell>
          {/* Digital journals */}
          <Cell className="col-span-1 row-span-1">
            <Feature icon={BookOpen} title="Journals" desc="E-journals & theses." compact />
          </Cell>

          {/* Search */}
          <Cell className="col-span-2 row-span-1 lg:col-span-2">
            <SearchMock />
          </Cell>

          {/* Trust */}
          <Cell className="col-span-2 row-span-1 lg:col-span-2">
            <Feature icon={ShieldCheck} title="Enterprise-grade" desc="SOC 2 Type II · GDPR · FERPA compliant." />
          </Cell>
        </div>
      </div>
    </section>
  );
}

function Cell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -3 }}
      className={`group relative overflow-hidden rounded-2xl glass p-4 transition hover:border-neon/40 ${className}`}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-neon/0 blur-2xl transition-all duration-500 group-hover:bg-neon/15" />
      <div className="relative flex h-full flex-col">{children}</div>
    </motion.div>
  );
}

function Feature({ icon: Icon, title, desc, compact }: { icon: any; title: string; desc: string; compact?: boolean }) {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-background/60 text-neon ring-1 ring-border transition group-hover:bg-neon-gradient group-hover:text-neon-foreground">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <h3 className={`font-display font-semibold ${compact ? "text-sm" : "text-base"}`}>{title}</h3>
        <p className={`mt-1 text-muted-foreground ${compact ? "text-[11px]" : "text-xs"}`}>{desc}</p>
      </div>
    </div>
  );
}

function BigStat({ label, value, caption, icon: Icon }: { label: string; value: string; caption: string; icon: any }) {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <span className="text-neon"><Icon className="h-4 w-4" /></span>
      </div>
      <div>
        <div className="font-display text-4xl font-semibold text-gradient">{value}</div>
        <div className="mt-1 text-[11px] text-muted-foreground">{caption}</div>
      </div>
    </div>
  );
}

function DashboardMock() {
  return (
    <>
      <div className="flex items-center gap-1.5 pb-3">
        <span className="h-2 w-2 rounded-full bg-red-400/70" />
        <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
        <span className="h-2 w-2 rounded-full bg-green-400/70" />
        <div className="ml-3 flex flex-1 items-center gap-2 rounded-md bg-background/40 px-2 py-1 text-[10px] text-muted-foreground">
          <Search className="h-3 w-3" /> Search the knowledge graph…
        </div>
      </div>
      <div className="grid flex-1 grid-cols-12 gap-2">
        <div className="col-span-3 space-y-1.5 rounded-lg bg-background/40 p-2">
          {["Overview", "Catalog", "Loans", "Insights", "Settings"].map((i, idx) => (
            <div key={i} className={`rounded px-2 py-1 text-[10px] ${idx === 3 ? "bg-neon-gradient text-neon-foreground" : "text-muted-foreground"}`}>{i}</div>
          ))}
        </div>
        <div className="col-span-9 grid grid-cols-3 gap-2">
          {[
            { l: "Loans", v: "1,204", d: "+2.1%" },
            { l: "Returns", v: "982", d: "On time" },
            { l: "Holds", v: "311", d: "+24" },
          ].map((s) => (
            <div key={s.l} className="rounded-lg bg-background/40 p-2">
              <div className="text-[9px] uppercase tracking-wide text-muted-foreground">{s.l}</div>
              <div className="font-display text-sm font-semibold">{s.v}</div>
              <div className="text-[9px] text-neon">{s.d}</div>
            </div>
          ))}
          <div className="col-span-3 rounded-lg bg-background/40 p-2">
            <div className="mb-1 flex items-center justify-between text-[9px] text-muted-foreground">
              <span>Circulation pulse</span><span className="text-neon">Live</span>
            </div>
            <Bars />
          </div>
        </div>
      </div>
    </>
  );
}

function Bars() {
  const bars = [40, 65, 55, 78, 62, 88, 72, 95, 80, 92, 70, 86];
  return (
    <div className="flex h-12 items-end gap-1">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.04, duration: 0.5 }}
          className="flex-1 rounded-t bg-gradient-to-t from-primary to-neon"
          style={{ minHeight: 3 }}
        />
      ))}
    </div>
  );
}

function ChatbotMock() {
  return (
    <>
      <div className="flex items-center gap-2 border-b border-border pb-2">
        <div className="grid h-7 w-7 place-items-center rounded-lg bg-neon-gradient"><Bot className="h-3.5 w-3.5 text-neon-foreground" /></div>
        <div>
          <div className="text-[11px] font-medium">Lumi Assistant</div>
          <div className="text-[10px] text-neon">online · AI agent</div>
        </div>
      </div>
      <div className="mt-2 flex-1 space-y-2 overflow-hidden">
        <div className="rounded-lg bg-background/40 p-2 text-[11px] text-muted-foreground">
          "Trending ML books for grads?"
        </div>
        <div className="rounded-lg bg-neon/10 p-2 text-[11px]">
          Found 12 titles. Top pick: <span className="text-neon">Probabilistic ML — Murphy</span>.
        </div>
        <div className="rounded-lg bg-background/40 p-2 text-[11px] text-muted-foreground">
          "Reserve 3 copies for next week."
        </div>
        <div className="rounded-lg bg-neon/10 p-2 text-[11px]">
          Done. Notified 3 students on the waitlist.
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2 rounded-lg bg-background/40 px-2 py-1.5 text-[10px] text-muted-foreground">
        <span className="flex-1">Ask anything…</span>
        <span className="rounded bg-background/60 px-1.5 py-0.5">↵</span>
      </div>
    </>
  );
}

function AnalyticsChart() {
  return (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Reader engagement</span>
        <span className="text-neon"><BarChart3 className="h-4 w-4" /></span>
      </div>
      <div className="mt-2 flex-1">
        <div className="font-display text-3xl font-semibold">12,418</div>
        <div className="text-[10px] text-muted-foreground">Active this week · +8.2%</div>
      </div>
      <Bars />
    </>
  );
}

function SearchMock() {
  return (
    <>
      <div className="flex items-center gap-2 rounded-lg bg-background/40 px-3 py-2 text-xs">
        <Search className="h-3.5 w-3.5 text-neon" />
        <span className="flex-1 truncate text-muted-foreground">"books about distributed systems"</span>
        <span className="rounded bg-background/60 px-1.5 py-0.5 text-[10px]">AI</span>
      </div>
      <div className="mt-2 flex-1 space-y-1.5">
        {["Designing Data-Intensive Apps", "Distributed Systems — Tanenbaum", "Database Internals"].map((b) => (
          <div key={b} className="flex items-center justify-between rounded bg-background/30 px-2 py-1 text-[11px]">
            <span>{b}</span><span className="text-neon">98%</span>
          </div>
        ))}
      </div>
    </>
  );
}

/* ---------------- Solutions ---------------- */

function Solutions() {
  const items = [
    { role: "Admin", desc: "System-wide governance, audits and budget control." },
    { role: "Librarian", desc: "Cataloging, circulation, and acquisitions on autopilot." },
    { role: "Student", desc: "Personalized discovery, reservations, and reading paths." },
    { role: "Researcher", desc: "Citation graph, journal access and collaboration tools." },
  ];
  return (
    <section id="solutions" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">Built for every role.</h2>
          <p className="mt-3 text-muted-foreground">Each persona gets a tailored interface and intelligent workflows.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((i) => (
            <div key={i.role} className="rounded-2xl glass p-5">
              <div className="font-display text-lg font-semibold">{i.role}</div>
              <p className="mt-2 text-sm text-muted-foreground">{i.desc}</p>
              <Link to="/login" className="mt-4 inline-flex items-center gap-1 text-xs text-neon hover:underline">
                Explore dashboard →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonial ---------------- */

function Testimonial() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-4xl px-4">
        <div className="rounded-3xl glass-strong p-10 text-center shadow-elevated">
          <Quote className="mx-auto h-6 w-6 text-neon" />
          <p className="mx-auto mt-4 max-w-2xl font-display text-2xl leading-snug">
            "Lumina turned six fragmented systems into one intelligent surface.
            Our circulation went up <span className="text-gradient">38%</span> in a single semester."
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 text-sm">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-neon-gradient text-neon-foreground font-semibold">PM</div>
            <div className="text-left">
              <div className="font-medium">Dr. Priya Menon</div>
              <div className="text-xs text-muted-foreground">Director of Libraries · Northfield University</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */

function CTA() {
  return (
    <section id="contact" className="relative py-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-10 text-center shadow-elevated">
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-neon/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
          <h2 className="font-display text-4xl font-semibold sm:text-5xl">
            Bring your library <span className="text-gradient">into the future</span>.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Join hundreds of institutions modernizing their knowledge infrastructure with Lumina.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link to="/register" className="rounded-xl bg-neon-gradient px-5 py-3 text-sm font-medium text-neon-foreground shadow-glow">
              Start Free Trial
            </Link>
            <Link to="/login" className="rounded-xl border border-border bg-background/40 px-5 py-3 text-sm font-medium">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-xs text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="grid h-6 w-6 place-items-center rounded-md bg-neon-gradient text-neon-foreground"><Library className="h-3 w-3" /></div>
          <span>© {new Date().getFullYear()} Lumina Systems. All rights reserved.</span>
        </div>
        <div className="flex gap-5">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#" className="hover:text-foreground">Security</a>
        </div>
      </div>
    </footer>
  );
}
