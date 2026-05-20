import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, Sparkles, Bot, Radio, BookOpen, BarChart3, Brain,
  ShieldCheck, Search, Library, Quote, CheckCircle2, GraduationCap, FlaskConical,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import libraryHero from "@/assets/library-hero.jpg";

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
      <Trusted />
      <Features />
      <Roles />
      <Workflow />
      <Testimonial />
      <CTA />
      <Footer />
    </div>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={libraryHero}
          alt="Library shelves filled with books"
          className="h-full w-full object-cover"
        />
        {/* Sophisticated layered overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--neon)/0.12,_transparent_60%)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pt-36 pb-28 lg:grid-cols-12 lg:pt-44 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-background/60 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-neon backdrop-blur">
            <Sparkles className="h-3 w-3" /> AI Library Operating System
          </div>
          <h1 className="mt-6 font-display text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-[5.25rem]">
            The intelligent
            <br />
            backbone for
            <br />
            <span className="text-gradient italic">modern libraries.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Lumina unifies discovery, circulation and analytics into a single,
            adaptive platform — engineered for universities, research institutes
            and national archives.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 rounded-full bg-neon-gradient px-6 py-3.5 text-sm font-medium text-neon-foreground shadow-glow transition hover:scale-[1.02]"
            >
              Request a Demo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-6 py-3.5 text-sm font-medium backdrop-blur transition hover:bg-background/70"
            >
              Sign in to Lumina
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs text-muted-foreground">
            {[
              "SOC 2 Type II",
              "GDPR & FERPA",
              "SSO / SAML",
              "99.99% uptime",
            ].map((b) => (
              <div key={b} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-neon" /> {b}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right column — refined floating metric card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:col-span-5 lg:block"
        >
          <div className="relative mt-12">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-neon/10 blur-3xl" />
            <div className="rounded-3xl border border-border bg-background/70 p-6 shadow-elevated backdrop-blur-2xl">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Library Pulse</div>
                  <div className="font-display text-lg">Northfield University</div>
                </div>
                <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-neon" />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-4">
                {[
                  { l: "Active Loans", v: "1,204" },
                  { l: "Returns Today", v: "982" },
                  { l: "Reservations", v: "311" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="font-display text-2xl font-medium">{s.v}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
                  <span>Circulation · 12 hrs</span>
                  <span className="text-neon">+8.2%</span>
                </div>
                <div className="flex h-16 items-end gap-1">
                  {[40, 65, 55, 78, 62, 88, 72, 95, 80, 92, 70, 86].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.6 + i * 0.04, duration: 0.5 }}
                      className="flex-1 rounded-sm bg-gradient-to-t from-primary/60 to-neon"
                    />
                  ))}
                </div>
              </div>
              <div className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-background/40 p-3">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-neon-gradient">
                  <Bot className="h-4 w-4 text-neon-foreground" />
                </div>
                <div className="text-xs">
                  <div className="font-medium">Lumi suggested 12 acquisitions</div>
                  <div className="text-muted-foreground">based on this week's demand</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Trusted strip ---------------- */

function Trusted() {
  const logos = ["Northfield", "Avalon Inst.", "Cambridge Arc.", "Helix Univ.", "Meridian Lib.", "Polaris Edu."];
  return (
    <section className="border-y border-border/60 bg-background/60 py-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Trusted by 400+ institutions worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {logos.map((l) => (
              <span key={l} className="font-display text-sm tracking-wide text-muted-foreground/80">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Features ---------------- */

const featureList = [
  {
    icon: Brain,
    title: "Adaptive Recommendations",
    desc: "Neural ranking learns from every borrowing pattern, surfacing the right title to the right reader.",
  },
  {
    icon: Search,
    title: "Unified Discovery",
    desc: "One search across catalog, e-journals, theses and external indices — with semantic understanding.",
  },
  {
    icon: Radio,
    title: "RFID & IoT Circulation",
    desc: "Zero-touch check-in, anti-theft gates and shelf intelligence integrated into one fabric.",
  },
  {
    icon: BarChart3,
    title: "Executive Analytics",
    desc: "Real-time dashboards on engagement, collections health and ROI — exportable for boards.",
  },
  {
    icon: Bot,
    title: "Lumi AI Assistant",
    desc: "Conversational agent for librarians and patrons. Reserve, recommend and resolve in seconds.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    desc: "SOC 2 Type II, GDPR and FERPA aligned. SSO, SAML, role-based access and full audit trail.",
  },
];

function Features() {
  return (
    <section id="features" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.22em] text-neon">Platform</div>
          <h2 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-5xl">
            Engineered for the entire library workflow.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Six tightly integrated modules replace the patchwork of legacy ILS,
            discovery layers and analytics tools.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {featureList.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group relative bg-background p-8 transition hover:bg-accent/30"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-background text-neon transition group-hover:border-neon/40">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-display text-xl font-medium">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              <div className="mt-6 inline-flex items-center gap-1 text-xs text-neon opacity-0 transition group-hover:opacity-100">
                Learn more <ArrowRight className="h-3 w-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Roles ---------------- */

function Roles() {
  const roles = [
    { icon: BookOpen, role: "Librarians", desc: "Cataloging, circulation, acquisitions and reader services on a single console." },
    { icon: GraduationCap, role: "Students", desc: "Personalized discovery, holds, renewals and AI-curated reading paths." },
    { icon: FlaskConical, role: "Researchers", desc: "Citation graphs, journal access, dataset linking and collaboration tools." },
  ];
  return (
    <section id="solutions" className="relative border-t border-border bg-deep py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-xl">
            <div className="text-xs uppercase tracking-[0.22em] text-neon">Solutions</div>
            <h2 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-5xl">
              A tailored surface for every role.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            From the dean's executive view to the student's reading list — every persona
            gets workflows shaped to their day.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((r) => (
            <div
              key={r.role}
              className="group relative flex flex-col rounded-2xl border border-border bg-background/60 p-7 backdrop-blur transition hover:-translate-y-1 hover:border-neon/40 hover:shadow-elevated"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-neon-gradient text-neon-foreground">
                <r.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-display text-lg font-medium">{r.role}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
              <Link
                to="/login"
                className="mt-6 inline-flex items-center gap-1 text-xs uppercase tracking-wider text-neon"
              >
                Explore dashboard <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Workflow ---------------- */

function Workflow() {
  const steps = [
    { n: "01", t: "Connect", d: "Import MARC records, link e-resources and integrate SSO in under a day." },
    { n: "02", t: "Configure", d: "Define branches, roles and circulation rules with declarative policies." },
    { n: "03", t: "Activate AI", d: "Train Lumi on your corpus — recommendations and search go live instantly." },
    { n: "04", t: "Operate", d: "Run circulation, analytics and acquisitions from one calm command center." },
  ];
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.22em] text-neon">Implementation</div>
          <h2 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-5xl">
            From legacy ILS to Lumina in four weeks.
          </h2>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="bg-background p-8">
              <div className="font-display text-sm tracking-[0.3em] text-neon">{s.n}</div>
              <h3 className="mt-4 font-display text-xl font-medium">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
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
    <section className="relative border-t border-border bg-deep py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Quote className="mx-auto h-7 w-7 text-neon" />
        <blockquote className="mx-auto mt-6 max-w-3xl font-display text-2xl leading-snug sm:text-3xl">
          Lumina turned six fragmented systems into one intelligent surface.
          Our circulation went up <span className="text-gradient italic">38%</span> in a single semester.
        </blockquote>
        <div className="mt-8 flex items-center justify-center gap-3 text-sm">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-neon-gradient font-medium text-neon-foreground">
            PM
          </div>
          <div className="text-left">
            <div className="font-medium">Dr. Priya Menon</div>
            <div className="text-xs text-muted-foreground">Director of Libraries · Northfield University</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */

function CTA() {
  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-background via-background to-accent/40 p-12 shadow-elevated md:p-16">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-neon/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative grid items-center gap-10 md:grid-cols-2">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-neon">Get started</div>
              <h2 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-5xl">
                Bring your library into the future.
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                Talk to our specialists. We'll map a migration path tailored to your collection,
                infrastructure and goals.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-neon-gradient px-7 py-3.5 text-sm font-medium text-neon-foreground shadow-glow"
              >
                Request a Demo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/40 px-7 py-3.5 text-sm font-medium"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-neon-gradient text-neon-foreground">
              <Library className="h-3.5 w-3.5" />
            </div>
            <span className="font-display text-base font-semibold">Lumina.</span>
          </div>
          <p className="mt-4 max-w-xs text-xs text-muted-foreground">
            The AI operating system for modern libraries.
          </p>
        </div>
        {[
          { h: "Product", l: ["Features", "Solutions", "Analytics", "Security"] },
          { h: "Company", l: ["About", "Customers", "Careers", "Press"] },
          { h: "Resources", l: ["Documentation", "Help center", "Status", "Contact"] },
        ].map((col) => (
          <div key={col.h}>
            <div className="text-xs font-medium uppercase tracking-wider text-foreground">{col.h}</div>
            <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
              {col.l.map((i) => (
                <li key={i}><a href="#" className="hover:text-foreground">{i}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-border px-6 pt-6 text-xs text-muted-foreground sm:flex-row">
        <span>© {new Date().getFullYear()} Lumina Systems. All rights reserved.</span>
        <div className="flex gap-5">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#" className="hover:text-foreground">Security</a>
        </div>
      </div>
    </footer>
  );
}
