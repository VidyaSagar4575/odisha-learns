import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { MobileShell } from "@/layouts/mobile-shell";
import { PageHeader } from "@/components/page-header";
import { SubjectIcon } from "@/components/subject-icon";
import { SUBJECTS } from "@/data/mock";

export const Route = createFileRoute("/subjects/")({
  component: Subjects,
});

function Subjects() {
  return (
    <MobileShell>
      <PageHeader title="All Subjects" subtitle="Pick a subject to see chapters" showBack={false} />
      <div className="space-y-3 px-5">
        {SUBJECTS.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
          >
            <Link
              to="/subjects/$subjectId"
              params={{ subjectId: s.id }}
              className={`flex items-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-br ${s.gradient} p-4 text-white shadow-card transition active:scale-[0.98]`}
            >
              <div className="grid size-12 place-items-center rounded-xl bg-white/20 backdrop-blur">
                <SubjectIcon name={s.icon} className="size-6" />
              </div>
              <div className="flex-1">
                <div className="text-base font-bold">{s.name}</div>
                <div className="text-xs text-white/85">
                  {s.chapters.length} chapters · {s.questionCount} questions
                </div>
              </div>
              <ChevronRight className="size-5 opacity-80" />
            </Link>
          </motion.div>
        ))}
      </div>
    </MobileShell>
  );
}
