import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Bot,
  Activity,
  CalendarCheck,
  Radio,
  BookOpen,
  BarChart3,
  Bell,
  Brain,
  ShieldCheck,
  Search,
  Library,
  TrendingUp,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { AIParticles } from "@/components/ai-particles";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Lumina — AI Smart Library Management System" },
      { name: "description", content: "Transform libraries into intelligent digital knowledge ecosystems with Lumina's AI-powered library management platform." },
      { property: "og:title", content: "Lumina — AI Smart Library Management" },
      { property: "og:description", content: "Enterprise AI library OS with smart recommendations, RFID, analytics, and a built-in chatbot." },
    ],
  }),
});

const features = [
  { icon: Brain, title: "AI Book Recommendation", desc: "Personalized reading paths powered by neural ranking on reader behaviour." },
  { icon: Bot, title: "Smart Chatbot", desc: "24/7 conversational librarian trained on your full catalog and policies." },
  { icon: Activity, title: "Real-Time Tracking", desc: "Live circulation, occupancy and shelf intelligence across every branch." },
  { icon: CalendarCheck, title: "Reservation Automation", desc: "Predictive holds, smart waitlists, and auto-notifications to readers." },
  { icon: Radio, title: "RFID Integration", desc: "Tag, scan, and audit collections in seconds with zero touch hardware." },
  { icon: BookOpen, title: "Digital Journals", desc: "Unified access to e-journals, theses, and open-access repositories." },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Real-time KPIs, cohort insights and forecasts for every stakeholder." },
  { icon: Bell, title: "Smart Notifications", desc: "Context-aware alerts via email, SMS, and in-app pulse signals." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <Hero />
      <LogoBar />
      <Features />
      <DashboardPreview />
      <Solutions />
      <CTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero pb-24 pt-36">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <AIParticles />
      <div className="pointer-events-none absolute -top-20 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-72 w-72 rounded-full bg-neon/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-neon">
            <Sparkles className="h-3 w-3" /> Powered by adaptive AI
          </div>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-gradient">AI-Powered Smart</span>
            <br />
            Library Management System
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Transforming traditional libraries into intelligent digital knowledge ecosystems — predictive,
            connected, and built for the next generation of readers.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 rounded-xl bg-neon-gradient px-5 py-3 text-sm font-medium text-neon-foreground shadow-glow transition hover:scale-[1.02]"
            >
              Get Started <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium backdrop-blur transition hover:bg-white/10"
            >
              Login
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              Request Demo →
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-neon" /> SOC 2 Type II</div>
            <div className="flex items-center gap-2"><Library className="h-4 w-4 text-neon" /> 400+ campuses</div>
            <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-neon" /> 38% engagement lift</div>
          </div>
        </motion.div>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.15 }}
      className="relative"
    >
      {/* Main dashboard mock */}
      <div className="relative glass-strong rounded-2xl p-4 shadow-elevated">
        <div className="flex items-center gap-1.5 pb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
          <div className="ml-3 flex flex-1 items-center gap-2 rounded-md bg-white/5 px-2 py-1 text-xs text-muted-foreground">
            <Search className="h-3 w-3" /> Search the knowledge graph…
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Active readers", value: "12,418", delta: "+8.2%" },
            { label: "Loans today", value: "1,204", delta: "+2.1%" },
            { label: "AI suggestions", value: "89,310", delta: "+24%" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl glass p-3">
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{s.label}</div>
              <div className="mt-1 font-display text-lg font-semibold">{s.value}</div>
              <div className="text-[10px] text-neon">{s.delta}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl glass p-4">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Circulation pulse</span>
            <span className="text-neon">Live</span>
          </div>
          <ChartBars />
        </div>
      </div>

      {/* Floating analytics card */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-6 -bottom-6 hidden w-56 rounded-2xl glass-strong p-4 shadow-elevated sm:block"
      >
        <div className="flex items-center gap-2 text-xs text-muted-foreground"><BarChart3 className="h-4 w-4 text-neon" /> Engagement</div>
        <div className="mt-1 font-display text-2xl font-semibold">+38%</div>
        <div className="text-[11px] text-muted-foreground">vs. last semester</div>
      </motion.div>

      {/* Floating chatbot preview */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-4 -top-4 hidden w-64 rounded-2xl glass-strong p-3 shadow-elevated sm:block"
      >
        <div className="flex items-center gap-2 text-xs">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-neon-gradient"><Bot className="h-3.5 w-3.5 text-neon-foreground" /></div>
          <div>
            <div className="text-[11px] font-medium">Lumi Assistant</div>
            <div className="text-[10px] text-neon">online</div>
          </div>
        </div>
        <div className="mt-2 rounded-lg bg-white/5 p-2 text-[11px] text-muted-foreground">
          "Show me trending machine learning books for graduate students."
        </div>
        <div className="mt-2 rounded-lg bg-neon/10 p-2 text-[11px]">
          Found 12 titles. Top pick: <span className="text-neon">Probabilistic ML — Murphy</span>.
        </div>
      </motion.div>
    </motion.div>
  );
}

function ChartBars() {
  const bars = [40, 65, 55, 78, 62, 88, 72, 95, 80, 92, 70, 86];
  return (
    <div className="flex h-24 items-end gap-1.5">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ delay: i * 0.05, duration: 0.6, ease: "easeOut" }}
          className="flex-1 rounded-t bg-gradient-to-t from-primary to-neon"
          style={{ minHeight: 4 }}
        />
      ))}
    </div>
  );
}

function LogoBar() {
  const items = ["MIT Libraries", "Stanford", "Oxford", "IIT-Bombay", "ETH Zürich", "NUS"];
  return (
    <div className="border-y border-white/5 bg-deep/40 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">Trusted by research institutions worldwide</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
          {items.map((i) => (
            <span key={i} className="font-display text-sm tracking-wide">{i}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-neon">
            <Sparkles className="h-3 w-3" /> Capabilities
          </div>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Everything a modern library needs, <span className="text-gradient">intelligently unified</span>.
          </h2>
          <p className="mt-3 text-muted-foreground">
            From discovery to circulation, Lumina connects every workflow with adaptive AI.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl glass p-5 transition hover:border-neon/40"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-neon/0 blur-2xl transition-all duration-500 group-hover:bg-neon/20" />
              <div className="relative">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-neon ring-1 ring-white/10 transition group-hover:bg-neon-gradient group-hover:text-neon-foreground">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <section id="analytics" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-neon">
              <BarChart3 className="h-3 w-3" /> Analytics
            </div>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              The control room for your <span className="text-gradient">knowledge ecosystem</span>.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Built-in dashboards for admins, librarians, students, and researchers — each tailored to their workflow.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {["Role-aware widgets and permissions", "Predictive demand forecasting", "Open APIs for any LMS, SIS, or ERP"].map((t) => (
                <li key={t} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-neon" /> {t}</li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="glass-strong rounded-2xl p-4 shadow-elevated">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-3 space-y-2 rounded-xl bg-white/5 p-3">
                  {["Overview", "Catalog", "Loans", "Readers", "AI Insights", "Settings"].map((i, idx) => (
                    <div key={i} className={`rounded-lg px-2 py-1.5 text-[11px] ${idx === 4 ? "bg-neon-gradient text-neon-foreground" : "text-muted-foreground"}`}>
                      {i}
                    </div>
                  ))}
                </div>
                <div className="col-span-9 space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    {["Loans", "Returns", "Holds"].map((l, i) => (
                      <div key={l} className="rounded-xl glass p-3">
                        <div className="text-[10px] text-muted-foreground">{l}</div>
                        <div className="font-display text-base font-semibold">{[1204, 982, 311][i]}</div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl glass p-4">
                    <div className="mb-2 text-[10px] uppercase tracking-wide text-muted-foreground">Reader engagement</div>
                    <ChartBars />
                  </div>
                  <div className="rounded-xl glass p-3 text-[11px] text-muted-foreground">
                    <span className="text-neon">AI Insight ▸</span> Demand for "Operating Systems" likely to spike 22% next week.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Solutions() {
  const items = [
    { role: "Admin", desc: "System-wide governance, audits and budget control." },
    { role: "Librarian", desc: "Cataloging, circulation, and acquisitions on autopilot." },
    { role: "Student", desc: "Personalized discovery, reservations, and reading paths." },
    { role: "Researcher", desc: "Citation graph, journal access and collaboration tools." },
  ];
  return (
    <section id="solutions" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">Built for every role.</h2>
          <p className="mt-3 text-muted-foreground">Each persona gets a tailored interface and intelligent workflows.</p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((i) => (
            <div key={i.role} className="rounded-2xl glass p-5">
              <div className="font-display text-lg font-semibold">{i.role}</div>
              <p className="mt-2 text-sm text-muted-foreground">{i.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" className="relative py-24">
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
            <Link to="/login" className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium">
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
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-xs text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Lumina Systems. All rights reserved.</p>
        <div className="flex gap-5">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#" className="hover:text-foreground">Security</a>
        </div>
      </div>
    </footer>
  );
}
