import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { MobileShell } from "@/layouts/mobile-shell";
import { PageHeader } from "@/components/page-header";
import { SUBJECTS, type Subject, type Chapter, type Difficulty } from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/subjects/$subjectId/$chapterId")({
  component: Topics,
  loader: ({ params }): { subject: Subject; chapter: Chapter } => {
    const subject = SUBJECTS.find((s) => s.id === params.subjectId);
    const chapter = subject?.chapters.find((c) => c.id === params.chapterId);
    if (!subject || !chapter) throw notFound();
    return { subject, chapter };
  },
});

const diffStyle: Record<Difficulty, string> = {
  Easy: "bg-success/15 text-success",
  Medium: "bg-warning/20 text-warning-foreground",
  Hard: "bg-destructive/15 text-destructive",
};

function Topics() {
  const { subject, chapter } = Route.useLoaderData() as { subject: Subject; chapter: Chapter };
  return (
    <MobileShell>
      <PageHeader title={chapter.name} subtitle={subject.name} />
      <div className="space-y-3 px-5">
        {chapter.topics.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * i }}
          >
            <Link
              to="/quiz/$topicId"
              params={{ topicId: t.id }}
              search={{ subject: subject.id, chapter: chapter.id }}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft transition active:scale-[0.98]"
            >
              <div className="flex-1">
                <div className="text-sm font-bold">{t.name}</div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{t.questionCount} questions</span>
                  <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", diffStyle[t.difficulty])}>
                    {t.difficulty}
                  </span>
                </div>
              </div>
              <div className="grid size-10 place-items-center rounded-xl gradient-saffron text-white shadow-saffron">
                <Play className="size-4" fill="currentColor" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </MobileShell>
  );
}
