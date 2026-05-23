import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Trophy, RefreshCw, Home } from "lucide-react";
import { ProgressRing } from "@/components/progress-ring";

interface ResultSearch {
  score: number;
  correct: number;
  wrong: number;
  unanswered: number;
  avgTime: number;
  total: number;
}

export const Route = createFileRoute("/result")({
  component: Result,
  validateSearch: (s: Record<string, unknown>): ResultSearch => ({
    score: Number(s.score ?? 0),
    correct: Number(s.correct ?? 0),
    wrong: Number(s.wrong ?? 0),
    unanswered: Number(s.unanswered ?? 0),
    avgTime: Number(s.avgTime ?? 0),
    total: Number(s.total ?? 0),
  }),
});

function Result() {
  const { score, correct, wrong, unanswered, avgTime, total } = Route.useSearch();
  const navigate = useNavigate();
  const high = score >= 80;

  const max = Math.max(correct, wrong, unanswered, 1);
  const bars = [
    { label: "Correct", value: correct, color: "bg-success" },
    { label: "Wrong", value: wrong, color: "bg-destructive" },
    { label: "Skipped", value: unanswered, color: "bg-muted-foreground/40" },
  ];

  return (
    <div className="mx-auto min-h-screen w-full max-w-md bg-background pb-32">
      <div className="relative overflow-hidden gradient-hero px-5 pt-10 pb-16 text-white">
        <div className="pointer-events-none absolute inset-0 pattern-odisha opacity-30" />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 text-center"
        >
          <div className="mx-auto inline-grid size-14 place-items-center rounded-2xl bg-white/15 backdrop-blur-md">
            <Trophy className="size-7" />
          </div>
          <h1 className="mt-3 text-2xl font-extrabold">
            {high ? "Excellent work!" : score >= 50 ? "Good effort!" : "Keep practicing!"}
          </h1>
          <p className="mt-1 text-xs text-white/80">Here's how you performed</p>
        </motion.div>
      </div>

      <div className="-mt-12 px-5">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="rounded-3xl border border-border bg-card p-5 shadow-card"
        >
          <div className="flex items-center gap-4">
            <ProgressRing value={score} size={120} label="Score" />
            <div className="flex-1 space-y-2">
              <Row label="Correct" value={`${correct}/${total}`} tone="text-success" />
              <Row label="Wrong" value={`${wrong}`} tone="text-destructive" />
              <Row label="Unanswered" value={`${unanswered}`} tone="text-muted-foreground" />
              <Row label="Avg time" value={`${avgTime}s`} tone="text-primary" />
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {bars.map((b, i) => (
              <div key={b.label}>
                <div className="mb-1 flex justify-between text-[11px] font-semibold">
                  <span className="text-muted-foreground">{b.label}</span>
                  <span>{b.value}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(b.value / max) * 100}%` }}
                    transition={{ delay: 0.1 * i, duration: 0.6 }}
                    className={`h-full rounded-full ${b.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="fixed inset-x-0 bottom-0 mx-auto flex max-w-md gap-3 p-5">
        <button
          onClick={() => navigate({ to: "/subjects" })}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 py-4 font-semibold text-foreground shadow-soft active:scale-[0.98]"
        >
          <Home className="size-4" /> Topics
        </button>
        <Link
          to="/subjects"
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl gradient-primary px-4 py-4 font-semibold text-white shadow-card active:scale-[0.98]"
        >
          <RefreshCw className="size-4" /> Retry
        </Link>
      </div>
    </div>
  );
}

function Row({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-bold ${tone}`}>{value}</span>
    </div>
  );
}
