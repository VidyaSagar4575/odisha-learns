import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Bell, Flame, TrendingUp, ChevronRight } from "lucide-react";
import { MobileShell } from "@/layouts/mobile-shell";
import { ProgressRing } from "@/components/progress-ring";
import { SubjectIcon } from "@/components/subject-icon";
import { SUBJECTS } from "@/data/mock";
import { useAppStore } from "@/store/app-store";

export const Route = createFileRoute("/home")({
  component: Home,
});

function Home() {
  const { selectedClass, history } = useAppStore();
  const accuracy = history.length
    ? Math.round(history.reduce((s, h) => s + h.score, 0) / history.length)
    : 0;
  const recent = history.slice(0, 2);

  return (
    <MobileShell>
      <div className="px-5 pt-7">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Hello Student 👋</p>
            <h1 className="text-2xl font-extrabold">Let's practice today</h1>
          </div>
          <button className="grid size-10 place-items-center rounded-xl border border-border bg-card shadow-soft">
            <Bell className="size-5" />
          </button>
        </div>

        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <span className="size-1.5 rounded-full bg-primary" />
          Class {selectedClass ?? "—"} · Odisha Board
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 overflow-hidden rounded-3xl gradient-hero p-5 text-white shadow-card"
        >
          <div className="flex items-center gap-4">
            <ProgressRing value={accuracy} size={104} label="Accuracy" />
            <div className="flex-1">
              <div className="text-xs uppercase tracking-wider text-white/75">Overall progress</div>
              <div className="mt-1 text-2xl font-extrabold">{history.length} quizzes</div>
              <div className="mt-2 flex items-center gap-3 text-xs">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-1">
                  <Flame className="size-3" /> 4-day streak
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-1">
                  <TrendingUp className="size-3" /> +12%
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <SectionTitle title="Continue Learning" to="/subjects" />
        <div className="grid grid-cols-2 gap-3">
          {recent.length === 0 && (
            <div className="col-span-2 rounded-2xl border border-dashed border-border p-5 text-center text-sm text-muted-foreground">
              Start your first quiz to see progress here.
            </div>
          )}
          {recent.map((h) => (
            <Link
              key={h.id}
              to="/subjects"
              className="rounded-2xl border border-border bg-card p-4 shadow-soft transition active:scale-[0.98]"
            >
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {h.subjectName}
              </div>
              <div className="mt-1 line-clamp-1 text-sm font-bold">{h.topicName}</div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{h.chapterName}</span>
                <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold text-success">
                  {h.score}%
                </span>
              </div>
            </Link>
          ))}
        </div>

        <SectionTitle title="Subjects" to="/subjects" />
        <div className="grid grid-cols-2 gap-3">
          {SUBJECTS.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i }}
            >
              <Link
                to="/subjects/$subjectId"
                params={{ subjectId: s.id }}
                className={`group block overflow-hidden rounded-2xl bg-gradient-to-br ${s.gradient} p-4 text-white shadow-card transition active:scale-[0.98]`}
              >
                <div className="grid size-10 place-items-center rounded-xl bg-white/20 backdrop-blur">
                  <SubjectIcon name={s.icon} className="size-5" />
                </div>
                <div className="mt-3 text-base font-bold">{s.name}</div>
                <div className="text-[11px] text-white/85">{s.questionCount} questions</div>
              </Link>
            </motion.div>
          ))}
        </div>

        <SectionTitle title="Performance" />
        <div className="grid grid-cols-3 gap-3">
          <Stat label="Correct" value={history.reduce((s, h) => s + h.correct, 0)} tone="success" />
          <Stat label="Wrong" value={history.reduce((s, h) => s + h.wrong, 0)} tone="destructive" />
          <Stat label="Avg time" value={`${Math.round(history.reduce((s, h) => s + h.avgTime, 0) / Math.max(1, history.length))}s`} tone="primary" />
        </div>
      </div>
    </MobileShell>
  );
}

function SectionTitle({ title, to }: { title: string; to?: string }) {
  return (
    <div className="mt-7 mb-3 flex items-end justify-between">
      <h2 className="text-base font-bold">{title}</h2>
      {to && (
        <Link to={to} className="inline-flex items-center text-xs font-semibold text-primary">
          See all <ChevronRight className="size-3.5" />
        </Link>
      )}
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: number | string; tone: "success" | "destructive" | "primary" }) {
  const map = {
    success: "text-success",
    destructive: "text-destructive",
    primary: "text-primary",
  } as const;
  return (
    <div className="rounded-2xl border border-border bg-card p-3 text-center shadow-soft">
      <div className={`text-xl font-extrabold ${map[tone]}`}>{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
