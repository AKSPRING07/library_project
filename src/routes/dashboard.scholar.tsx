import { createFileRoute } from "@tanstack/react-router";
import { FileText, Network, Quote, Sparkles } from "lucide-react";
import { DashboardShell, StatCard } from "@/components/dashboard-shell";

export const Route = createFileRoute("/dashboard/scholar")({
  component: ScholarDashboard,
  head: () => ({ meta: [{ title: "Research Dashboard — Lumina" }] }),
});

function ScholarDashboard() {
  return (
    <DashboardShell title="Research Workspace" role="Research Scholar" accent="Citation intelligence">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Papers tracked" value="284" delta="+12" icon={FileText} />
        <StatCard label="Citations" value="1,082" delta="+38" icon={Quote} />
        <StatCard label="Collaborators" value="14" icon={Network} />
        <StatCard label="AI summaries" value="62" delta="this month" icon={Sparkles} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl glass p-5">
          <div className="font-display text-lg font-semibold">Latest in your domain</div>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              "Scaling Laws for Sparse Mixtures",
              "Quantum Error Correction Survey 2026",
              "Geometric Deep Learning Revisited",
            ].map((t) => (
              <li key={t} className="rounded-lg bg-white/5 px-3 py-2">
                <div>{t}</div>
                <div className="text-[11px] text-muted-foreground">arXiv · summarized by Lumi</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl glass p-5">
          <div className="font-display text-lg font-semibold">Citation graph</div>
          <div className="relative mt-3 h-48 overflow-hidden rounded-xl bg-white/5">
            <div className="absolute inset-0 grid-bg opacity-50" />
            <div className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-neon-gradient shadow-glow">
              <Network className="h-5 w-5 text-neon-foreground" />
            </div>
            {[0, 60, 120, 180, 240, 300].map((d, i) => (
              <span
                key={i}
                className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-neon"
                style={{ transform: `rotate(${d}deg) translate(80px) rotate(-${d}deg)` }}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
