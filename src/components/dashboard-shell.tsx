import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  BookOpenCheck, LayoutDashboard, Library, Users, BarChart3, Settings, Bell, Search, Bot, LogOut, Sparkles, Send,
} from "lucide-react";
import { AIParticles } from "./ai-particles";
import { ThemeToggle } from "@/components/theme-provider";

export function DashboardShell({
  title, subtitle, role, children, accent, activeTab, onTabChange,
}: { title: string; subtitle?: string; role: string; children: React.ReactNode; accent?: string; activeTab?: string; onTabChange?: (tab: string) => void }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "lumi"; text: string }>>([
    { sender: "lumi", text: `Hello! I am Lumi, your AI Library Assistant. How can I help you manage your ${role.toLowerCase()} workspace today?` }
  ]);
  const [chatInput, setChatInput] = useState("");

  const handleChatSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatInput("");
    setChatMessages(prev => [...prev, { sender: "user", text: userMsg }]);

    setTimeout(() => {
      let lumiResponse = "I analyzed our digital catalog. We have resources matching your query. Let me know if you would like me to draft a citation or sum up chapter summaries.";
      const lowMsg = userMsg.toLowerCase();
      if (role.toLowerCase() === "student") {
        if (lowMsg.includes("recommend")) {
          lumiResponse = "Based on your interest in Machine Learning, I highly recommend checking out 'Designing Machine Learning Systems' by Chip Huyen or reading the 'Scaling Laws for Sparse Mixtures' paper in our arXiv section.";
        } else if (lowMsg.includes("due") || lowMsg.includes("borrow")) {
          lumiResponse = "You currently have active borrowed books. The closest due date is 'Probabilistic ML' which is due in 2 days. You can click 'Renew' directly on your borrowed list.";
        }
      } else if (role.toLowerCase() === "librarian") {
        if (lowMsg.includes("overdue") || lowMsg.includes("fine")) {
          lumiResponse = "We have active overdues. The highest is Jack Vance for 'Deep Learning Book' ($16.00). You can process payment or waive it in the circulation/fine section.";
        } else if (lowMsg.includes("inventory") || lowMsg.includes("book")) {
          lumiResponse = "Current inventory shows 4 main titles. 'Effective Java' has the highest stock count. You can add new books under the Inventory tab.";
        }
      } else if (role.toLowerCase() === "staff") {
        if (lowMsg.includes("grant") || lowMsg.includes("research")) {
          lumiResponse = "I tracked the latest NSF grant indexes and IEEE citation charts. Check out the Research tab for your priority gateways.";
        }
      }
      setChatMessages(prev => [...prev, { sender: "lumi", text: lumiResponse }]);
    }, 850);
  };

  const nav = [
    { icon: LayoutDashboard, label: "Overview" },
    { icon: Library, label: "Catalog" },
    { icon: Users, label: "Readers" },
    { icon: BarChart3, label: "Analytics" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-hero text-foreground">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <AIParticles count={14} />
      <div className="relative z-10 flex h-full">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col h-full overflow-y-auto border-r border-white/5 bg-deep/40 p-4 lg:flex">
          <Link to="/" className="mb-8 flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-neon-gradient shadow-glow">
              <BookOpenCheck className="h-4 w-4 text-neon-foreground" />
            </div>
            <span className="font-display text-lg font-semibold">Lumina<span className="text-neon">.</span></span>
          </Link>
          <nav className="space-y-1">
            {nav.map((n, i) => {
              const active = activeTab ? activeTab.toLowerCase() === n.label.toLowerCase() : (i === 0);
              return (
                <button 
                  key={n.label} 
                  onClick={() => onTabChange?.(n.label.toLowerCase())}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${active ? "bg-white/10 text-foreground border-l-2 border-neon pl-2.5" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"}`}
                >
                  <n.icon className="h-4 w-4" /> {n.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-8 rounded-xl glass p-3">
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Signed in as</div>
            <div className="mt-0.5 text-sm font-medium">{role}</div>
            <Link to="/login" onClick={() => localStorage.removeItem("lumina_session")} className="mt-3 flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"><LogOut className="h-3.5 w-3.5" /> Sign out</Link>
          </div>
        </aside>

        <main className="flex flex-1 flex-col h-screen overflow-hidden">
          {/* Top bar */}
          <header className="z-20 flex items-center gap-3 border-b border-white/5 bg-deep/50 px-6 py-3 backdrop-blur shrink-0">
            <div className="flex flex-1 items-center gap-2 rounded-xl glass px-3 py-2 text-xs">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input placeholder="Ask Lumi anything — books, readers, insights…" className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60" />
              <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-muted-foreground">⌘K</span>
            </div>
            <ThemeToggle />
            <button className="relative grid h-9 w-9 place-items-center rounded-xl glass">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-neon" />
            </button>
          </header>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 relative z-0">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-neon">
                    <Sparkles className="h-3 w-3" /> {accent ?? "AI workspace"}
                  </div>
                  <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">{title}</h1>
                  <p className="mt-1 text-sm text-muted-foreground">{subtitle || `Real-time view of your ${role.toLowerCase()} workspace.`}</p>
                </div>
              </div>

              <div className="mt-6">{children}</div>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Floating chatbot */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end">
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mb-3 w-80 rounded-2xl glass-strong p-3 shadow-elevated flex flex-col h-[380px]"
          >
            <div className="flex items-center gap-2 border-b border-white/10 pb-2 shrink-0">
              <div className="grid h-7 w-7 place-items-center rounded-lg bg-neon-gradient"><Bot className="h-3.5 w-3.5 text-neon-foreground" /></div>
              <div>
                <div className="text-sm font-medium">Lumi Assistant</div>
                <div className="text-[10px] text-neon">online</div>
              </div>
            </div>
            
            {/* Scrollable messages */}
            <div className="flex-1 mt-3 overflow-y-auto space-y-2 text-xs pr-1 select-text">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-xl p-2.5 leading-relaxed ${msg.sender === "user" ? "bg-neon-gradient text-neon-foreground" : "bg-white/5 text-muted-foreground border border-white/5"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input form */}
            <form onSubmit={handleChatSend} className="mt-2.5 flex gap-1.5 border-t border-white/10 pt-2 shrink-0">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask Lumi anything..." 
                className="w-full rounded-lg bg-white/5 px-2.5 py-1.5 text-xs border border-white/5 outline-none focus:border-neon/30 text-foreground"
              />
              <button type="submit" className="rounded-lg bg-neon-gradient p-1.5 text-neon-foreground flex items-center justify-center shrink-0">
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
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
