import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Bookmark, Clock, Sparkles } from "lucide-react";
import { DashboardShell, StatCard } from "@/components/dashboard-shell";

export const Route = createFileRoute("/dashboard/student")({
  component: StudentDashboard,
  head: () => ({ meta: [{ title: "Student Dashboard — Lumina" }] }),
});

function StudentDashboard() {
  return (
    <DashboardShell title="Welcome back, Alex" role="Student" accent="Personalized reading">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Currently borrowed" value="4" delta="2 due soon" icon={BookOpen} />
        <StatCard label="Wishlist" value="17" icon={Bookmark} />
        <StatCard label="Reading streak" value="12d" delta="+3" icon={Clock} />
        <StatCard label="AI matches" value="24" delta="for you" icon={Sparkles} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl glass p-5 lg:col-span-2">
          <div className="font-display text-lg font-semibold">Recommended for you</div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              "Probabilistic ML — Murphy",
              "Designing ML Systems — Huyen",
              "The Pragmatic Programmer",
            ].map((b) => (
              <div key={b} className="rounded-xl bg-white/5 p-3">
                <div className="mb-2 h-28 rounded-lg bg-gradient-to-br from-primary to-neon opacity-80" />
                <div className="text-sm font-medium">{b}</div>
                <div className="text-[11px] text-neon">98% match</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl glass p-5">
          <div className="flex items-center gap-2 text-xs text-neon"><Sparkles className="h-3 w-3" /> AI tip</div>
          <p className="mt-2 text-sm">Based on your last reads, try chapter 7 of <span className="text-neon">Probabilistic ML</span> next.</p>
          <button className="mt-4 rounded-lg bg-neon-gradient px-3 py-2 text-xs font-medium text-neon-foreground">Reserve now</button>
        </div>
      </div>
    </DashboardShell>
  );
}
