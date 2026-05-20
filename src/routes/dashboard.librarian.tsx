import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Repeat, Clock, Sparkles } from "lucide-react";
import { DashboardShell, StatCard } from "@/components/dashboard-shell";

export const Route = createFileRoute("/dashboard/librarian")({
  component: LibrarianDashboard,
  head: () => ({ meta: [{ title: "Librarian Dashboard — Lumina" }] }),
});

function LibrarianDashboard() {
  return (
    <DashboardShell title="Librarian Workspace" role="Librarian" accent="Daily operations">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Loans today" value="1,204" delta="+2.1%" icon={Repeat} />
        <StatCard label="Returns" value="982" delta="On time" icon={BookOpen} />
        <StatCard label="Overdue" value="38" delta="-12%" icon={Clock} />
        <StatCard label="New acquisitions" value="56" delta="this week" icon={Sparkles} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl glass p-5">
          <div className="font-display text-lg font-semibold">Recent activity</div>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              ["Returned", "Deep Learning — Goodfellow", "2m ago"],
              ["Reserved", "Clean Architecture — Martin", "11m ago"],
              ["Overdue", "Designing Data-Intensive Apps", "1h ago"],
              ["Acquired", "AI Engineering — Huyen", "today"],
            ].map(([a, b, c]) => (
              <li key={b} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                <span className="text-muted-foreground">{a} · <span className="text-foreground">{b}</span></span>
                <span className="text-xs text-muted-foreground">{c}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl glass p-5">
          <div className="font-display text-lg font-semibold">Smart queue</div>
          <p className="mt-1 text-sm text-muted-foreground">AI-prioritized tasks for the next hour.</p>
          <div className="mt-3 space-y-2 text-sm">
            {["Process 12 returns", "Approve 4 reservations", "Verify RFID for Aisle B"].map((t) => (
              <label key={t} className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2">
                <input type="checkbox" className="h-3.5 w-3.5 accent-[color:var(--neon)]" /> {t}
              </label>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
