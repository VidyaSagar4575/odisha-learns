import { ReactNode } from "react";
import { BottomNav } from "@/components/bottom-nav";

export function MobileShell({ children, withNav = true }: { children: ReactNode; withNav?: boolean }) {
  return (
    <div className="relative mx-auto min-h-screen w-full max-w-md overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 pattern-odisha opacity-50" />
      <main className={`relative z-10 ${withNav ? "pb-28" : ""}`}>{children}</main>
      {withNav && <BottomNav />}
    </div>
  );
}
