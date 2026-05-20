import { createFileRoute } from "@tanstack/react-router";
import { Users, BookOpen, ShieldCheck, TrendingUp, Sparkles } from "lucide-react";
import { DashboardShell, StatCard } from "@/components/dashboard-shell";

export const Route = createFileRoute("/dashboard/admin")({
  component: AdminDashboard,
  head: () => ({ meta: [{ title: "Admin Dashboard — Lumina" }] }),
});

function AdminDashboard() {
  return (
    <DashboardShell title="Admin Control Center" role="Admin" accent="Institutional governance">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active users" value="12,418" delta="+8.2%" icon={Users} />
        <StatCard label="Books in catalog" value="421,082" delta="+312" icon={BookOpen} />
        <StatCard label="Policy compliance" value="99.4%" delta="+0.3%" icon={ShieldCheck} />
        <StatCard label="Engagement" value="+38%" delta="vs last month" icon={TrendingUp} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl glass p-5 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground">System health</div>
              <div className="font-display text-lg font-semibold">All branches synced</div>
            </div>
            <span className="text-xs text-neon">Realtime</span>
          </div>
          <div className="flex h-40 items-end gap-1.5">
            {[40, 55, 48, 70, 62, 78, 65, 82, 74, 90, 80, 95, 88, 92].map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-primary to-neon" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="rounded-2xl glass p-5">
          <div className="flex items-center gap-2 text-xs text-neon"><Sparkles className="h-3 w-3" /> AI insight</div>
          <p className="mt-2 text-sm">Predicted 22% spike in CS textbook demand next week — consider increasing reservation quotas.</p>
          <button className="mt-4 rounded-lg bg-neon-gradient px-3 py-2 text-xs font-medium text-neon-foreground">Apply suggestion</button>
        </div>
      </div>
    </DashboardShell>
  );
}
