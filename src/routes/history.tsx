import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { MobileShell } from "@/layouts/mobile-shell";
import { PageHeader } from "@/components/page-header";
import { useAppStore } from "@/store/app-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/history")({
  component: History,
});

const TABS = ["All", "This Week", "High Score"] as const;

function History() {
  const { history } = useAppStore();
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");

  const filtered = history.filter((h) => {
    if (tab === "High Score") return h.score >= 80;
    if (tab === "This Week") {
      const d = new Date(h.date).getTime();
      return Date.now() - d < 7 * 86400000;
    }
    return true;
  });

  return (
    <MobileShell>
      <PageHeader title="History" subtitle="Your past quiz attempts" showBack={false} />
      <div className="px-5">
        <div className="flex gap-2 rounded-2xl bg-muted p-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 rounded-xl px-3 py-2 text-xs font-semibold transition",
                tab === t ? "bg-card text-foreground shadow-soft" : "text-muted-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-5 space-y-3">
          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              No attempts yet.
            </div>
          )}
          {filtered.map((h, i) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i }}
              className="relative rounded-2xl border border-border bg-card p-4 shadow-soft"
            >
              <div className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full gradient-primary" />
              <div className="flex items-start justify-between gap-2 pl-3">
                <div className="min-w-0">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {h.subjectName} · {new Date(h.date).toLocaleDateString()}
                  </div>
                  <div className="mt-0.5 truncate text-sm font-bold">{h.topicName}</div>
                  <div className="text-xs text-muted-foreground">{h.chapterName}</div>
                </div>
                <div
                  className={cn(
                    "rounded-xl px-3 py-2 text-center",
                    h.score >= 80 ? "bg-success/15 text-success" :
                      h.score >= 50 ? "bg-saffron-soft text-saffron" : "bg-destructive/15 text-destructive",
                  )}
                >
                  <div className="text-base font-extrabold leading-none">{h.score}%</div>
                  <div className="text-[9px] uppercase tracking-wider">score</div>
                </div>
              </div>
              <div className="mt-3 flex gap-2 pl-3 text-[11px] text-muted-foreground">
                <span>✓ {h.correct}</span>
                <span>✗ {h.wrong}</span>
                <span>· {h.avgTime}s avg</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MobileShell>
  );
}
