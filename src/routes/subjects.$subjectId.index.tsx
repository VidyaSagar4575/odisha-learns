import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronRight, BookOpenCheck } from "lucide-react";
import { MobileShell } from "@/layouts/mobile-shell";
import { PageHeader } from "@/components/page-header";
import { SUBJECTS, type Subject } from "@/data/mock";

export const Route = createFileRoute("/subjects/$subjectId/")({
  component: Chapters,
  loader: ({ params }): { subject: Subject } => {
    const subject = SUBJECTS.find((s) => s.id === params.subjectId);
    if (!subject) throw notFound();
    return { subject };
  },
});

function Chapters() {
  const { subject } = Route.useLoaderData() as { subject: Subject };
  return (
    <MobileShell>
      <PageHeader title={subject.name} subtitle={`${subject.chapters.length} chapters`} />
      <div className="space-y-3 px-5">
        {subject.chapters.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * i }}
          >
            <Link
              to="/subjects/$subjectId/$chapterId"
              params={{ subjectId: subject.id, chapterId: c.id }}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft transition active:scale-[0.98]"
            >
              <div className="grid size-12 place-items-center rounded-xl bg-primary-soft text-primary">
                <BookOpenCheck className="size-5" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Chapter {i + 1}
                </div>
                <div className="text-sm font-bold">{c.name}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{c.topics.length} topics</div>
              </div>
              <ChevronRight className="size-5 text-muted-foreground" />
            </Link>
          </motion.div>
        ))}
      </div>
    </MobileShell>
  );
}
