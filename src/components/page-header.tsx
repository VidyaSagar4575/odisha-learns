import { ChevronLeft } from "lucide-react";
import { useRouter } from "@tanstack/react-router";

export function PageHeader({
  title,
  subtitle,
  showBack = true,
  right,
}: {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  right?: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <header className="flex items-center gap-3 px-5 pt-6 pb-3">
      {showBack && (
        <button
          onClick={() => router.history.back()}
          aria-label="Back"
          className="grid size-10 place-items-center rounded-xl border border-border bg-card shadow-soft transition active:scale-95"
        >
          <ChevronLeft className="size-5" />
        </button>
      )}
      <div className="flex-1">
        <h1 className="text-xl font-bold leading-tight">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {right}
    </header>
  );
}
