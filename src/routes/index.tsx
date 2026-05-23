import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { GraduationCap, Sparkles } from "lucide-react";
import { useAppStore } from "@/store/app-store";

export const Route = createFileRoute("/")({
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  const { onboarded, selectedClass } = useAppStore();

  useEffect(() => {
    const t = setTimeout(() => {
      navigate({ to: onboarded && selectedClass ? "/home" : "/onboarding" });
    }, 1800);
    return () => clearTimeout(t);
  }, [navigate, onboarded, selectedClass]);

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center overflow-hidden gradient-hero text-white">
      <div className="pointer-events-none absolute inset-0 pattern-odisha opacity-30" />
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 16 }}
        className="relative z-10 grid size-24 place-items-center rounded-3xl bg-white/15 backdrop-blur-md ring-1 ring-white/30"
      >
        <GraduationCap className="size-12" strokeWidth={2.2} />
        <motion.span
          initial={{ rotate: -20, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="absolute -right-2 -top-2 grid size-8 place-items-center rounded-full bg-saffron text-saffron-foreground"
        >
          <Sparkles className="size-4" />
        </motion.span>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="relative z-10 mt-6 text-center text-2xl font-extrabold tracking-tight"
      >
        Class 6 to 10 Questions
      </motion.h1>
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 mt-2 max-w-[18rem] text-center text-sm text-white/85"
      >
        Offline MCQ Practice for Odisha Students
      </motion.p>

      <div className="absolute bottom-12 z-10 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="size-2 rounded-full bg-white/80"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}
