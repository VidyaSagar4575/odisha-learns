import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { GraduationCap, ArrowRight } from "lucide-react";
import { CLASS_OPTIONS } from "@/data/mock";
import { useAppStore } from "@/store/app-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({
  component: Onboarding,
});

function Onboarding() {
  const navigate = useNavigate();
  const { setClass, setOnboarded, selectedClass } = useAppStore();
  const [picked, setPicked] = useState<number | null>(selectedClass);

  const handleContinue = () => {
    if (picked == null) return;
    setClass(picked);
    setOnboarded(true);
    navigate({ to: "/home" });
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-md px-5 pt-10 pb-32">
      <motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <div className="grid size-14 place-items-center rounded-2xl gradient-primary text-white shadow-card">
          <GraduationCap className="size-7" />
        </div>
        <h1 className="mt-5 text-3xl font-extrabold leading-tight">Welcome, Student!</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Pick your class to get tailored MCQs aligned with the Odisha Board syllabus.
        </p>
      </motion.div>

      <div className="mt-7 grid grid-cols-2 gap-3">
        {CLASS_OPTIONS.map((c, i) => {
          const active = picked === c;
          return (
            <motion.button
              key={c}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setPicked(c)}
              className={cn(
                "relative aspect-[5/4] overflow-hidden rounded-3xl border p-4 text-left transition",
                active
                  ? "border-transparent gradient-primary text-white shadow-card"
                  : "border-border bg-card hover:border-primary/40",
              )}
            >
              <div className={cn("text-xs font-semibold uppercase tracking-wider", active ? "text-white/80" : "text-muted-foreground")}>
                Standard
              </div>
              <div className={cn("mt-2 text-5xl font-extrabold", active ? "text-white" : "text-foreground")}>
                {c}
              </div>
              <div className={cn("mt-1 text-xs", active ? "text-white/85" : "text-muted-foreground")}>
                Class {c}
              </div>
              <div
                className={cn(
                  "absolute -right-6 -bottom-6 size-24 rounded-full opacity-30",
                  active ? "bg-white" : "bg-saffron",
                )}
              />
            </motion.button>
          );
        })}
        <div className="aspect-[5/4] rounded-3xl border border-dashed border-border grid place-items-center text-xs text-muted-foreground p-4 text-center">
          More classes<br />coming soon
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 mx-auto max-w-md p-5">
        <button
          onClick={handleContinue}
          disabled={picked == null}
          className="flex w-full items-center justify-center gap-2 rounded-2xl gradient-primary px-6 py-4 font-semibold text-white shadow-card transition active:scale-[0.98] disabled:opacity-40"
        >
          Continue <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
