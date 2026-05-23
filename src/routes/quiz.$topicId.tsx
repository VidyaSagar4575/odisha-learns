import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { X, Timer, Check } from "lucide-react";
import { SAMPLE_QUESTIONS, SUBJECTS } from "@/data/mock";
import { useAppStore } from "@/store/app-store";
import { cn } from "@/lib/utils";

interface QuizSearch {
  subject?: string;
  chapter?: string;
}

export const Route = createFileRoute("/quiz/$topicId")({
  component: Quiz,
  validateSearch: (s: Record<string, unknown>): QuizSearch => ({
    subject: typeof s.subject === "string" ? s.subject : undefined,
    chapter: typeof s.chapter === "string" ? s.chapter : undefined,
  }),
});

const PER_Q = 30;

function Quiz() {
  const { topicId } = Route.useParams();
  const { subject: subjectId, chapter: chapterId } = Route.useSearch();
  const navigate = useNavigate();
  const { addAttempt } = useAppStore();

  const subject = SUBJECTS.find((s) => s.id === subjectId);
  const chapter = subject?.chapters.find((c) => c.id === chapterId);
  const topic = chapter?.topics.find((t) => t.id === topicId);

  const questions = useMemo(() => SAMPLE_QUESTIONS.slice(0, 6), []);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [time, setTime] = useState(PER_Q);
  const startedAt = useRef(Date.now());
  const answers = useRef<{ correct: boolean; answered: boolean; t: number }[]>([]);

  const q = questions[idx];

  useEffect(() => {
    if (locked) return;
    const i = setInterval(() => setTime((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(i);
  }, [idx, locked]);

  useEffect(() => {
    if (time === 0 && !locked) handleNext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  const choose = (i: number) => {
    if (locked) return;
    setPicked(i);
    setLocked(true);
  };

  const handleNext = () => {
    answers.current.push({
      correct: picked === q.correctIndex,
      answered: picked !== null,
      t: PER_Q - time,
    });
    if (idx + 1 >= questions.length) {
      finish();
      return;
    }
    setIdx((x) => x + 1);
    setPicked(null);
    setLocked(false);
    setTime(PER_Q);
  };

  const finish = () => {
    const correct = answers.current.filter((a) => a.correct).length;
    const answered = answers.current.filter((a) => a.answered).length;
    const wrong = answered - correct;
    const unanswered = questions.length - answered;
    const total = questions.length;
    const score = Math.round((correct / total) * 100);
    const avgTime = Math.round(
      answers.current.reduce((s, a) => s + a.t, 0) / Math.max(1, answers.current.length),
    );

    addAttempt({
      id: `${Date.now()}`,
      subjectId: subject?.id ?? "unknown",
      subjectName: subject?.name ?? "Unknown",
      chapterName: chapter?.name ?? "—",
      topicName: topic?.name ?? "—",
      score, total, correct, wrong, unanswered, avgTime,
      date: new Date().toISOString().slice(0, 10),
    });

    navigate({
      to: "/result",
      search: { score, correct, wrong, unanswered, avgTime, total },
    });
  };

  const progress = ((idx + (locked ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="mx-auto min-h-screen w-full max-w-md bg-background">
      <header className="px-5 pt-6 pb-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate({ to: "/subjects" })}
            className="grid size-9 place-items-center rounded-xl border border-border bg-card"
            aria-label="Exit"
          >
            <X className="size-4" />
          </button>
          <div className="text-xs font-semibold text-muted-foreground">
            {idx + 1} / {questions.length}
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-primary">
            <Timer className="size-3.5" />
            <span className="text-xs font-bold tabular-nums">{time}s</span>
          </div>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full gradient-primary"
            initial={false}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 text-[11px] uppercase tracking-wider text-muted-foreground">
          {subject?.name} · {topic?.name ?? "Practice"}
        </p>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="px-5"
        >
          <h2 className="mt-2 text-lg font-bold leading-snug">{q.question}</h2>

          <div className="mt-5 space-y-2.5">
            {q.options.map((opt, i) => {
              const isCorrect = locked && i === q.correctIndex;
              const isWrong = locked && picked === i && i !== q.correctIndex;
              return (
                <motion.button
                  key={i}
                  whileTap={{ scale: locked ? 1 : 0.98 }}
                  onClick={() => choose(i)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl border-2 bg-card p-4 text-left transition",
                    !locked && "border-border hover:border-primary/40",
                    picked === i && !locked && "border-primary",
                    isCorrect && "border-success bg-success/10",
                    isWrong && "border-destructive bg-destructive/10",
                  )}
                >
                  <div
                    className={cn(
                      "grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold",
                      isCorrect ? "bg-success text-success-foreground" :
                        isWrong ? "bg-destructive text-destructive-foreground" :
                        picked === i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                    )}
                  >
                    {isCorrect ? <Check className="size-4" /> : String.fromCharCode(65 + i)}
                  </div>
                  <span className="flex-1 text-sm font-medium">{opt}</span>
                </motion.button>
              );
            })}
          </div>

          {locked && q.explanation && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-2xl bg-primary-soft p-3 text-xs text-primary"
            >
              <strong>Explanation:</strong> {q.explanation}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="fixed inset-x-0 bottom-0 mx-auto max-w-md p-5">
        <button
          onClick={handleNext}
          disabled={!locked}
          className="w-full rounded-2xl gradient-primary px-6 py-4 font-semibold text-white shadow-card transition active:scale-[0.98] disabled:opacity-40"
        >
          {idx + 1 === questions.length ? "Finish quiz" : "Next question"}
        </button>
      </div>
    </div>
  );
}
