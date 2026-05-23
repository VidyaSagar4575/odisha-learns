import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronRight, Moon, GraduationCap, Trash2, Languages, Info } from "lucide-react";
import { MobileShell } from "@/layouts/mobile-shell";
import { PageHeader } from "@/components/page-header";
import { useAppStore } from "@/store/app-store";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/settings")({
  component: Settings,
});

function Settings() {
  const navigate = useNavigate();
  const { selectedClass, darkMode, toggleDark, clearLocal } = useAppStore();

  return (
    <MobileShell>
      <PageHeader title="Settings" subtitle="Manage your preferences" showBack={false} />
      <div className="space-y-3 px-5">
        <Group>
          <Row
            icon={<GraduationCap className="size-5" />}
            label="Change Class"
            hint={selectedClass ? `Class ${selectedClass}` : "Not set"}
            onClick={() => navigate({ to: "/onboarding" })}
            chevron
          />
          <Row
            icon={<Moon className="size-5" />}
            label="Dark Mode"
            hint="App-wide theme"
            right={<Switch checked={darkMode} onCheckedChange={toggleDark} />}
          />
        </Group>

        <Group>
          <Row
            icon={<Languages className="size-5" />}
            label="Language"
            hint="English · Odia (coming soon)"
            disabled
          />
          <Row
            icon={<Trash2 className="size-5" />}
            label="Clear Local Data"
            hint="Remove progress and history"
            destructive
            onClick={() => {
              if (confirm("Clear all local data?")) {
                clearLocal();
                navigate({ to: "/onboarding" });
              }
            }}
          />
        </Group>

        <Group>
          <Row icon={<Info className="size-5" />} label="App Version" hint="1.0.0 (MVP)" />
        </Group>

        <p className="pt-4 text-center text-[11px] text-muted-foreground">
          Class 6 to 10 Questions · Odisha Board
        </p>
      </div>
    </MobileShell>
  );
}

function Group({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      {children}
    </div>
  );
}

function Row({
  icon, label, hint, onClick, chevron, right, destructive, disabled,
}: {
  icon: React.ReactNode;
  label: string;
  hint?: string;
  onClick?: () => void;
  chevron?: boolean;
  right?: React.ReactNode;
  destructive?: boolean;
  disabled?: boolean;
}) {
  const Comp = onClick ? "button" : "div";
  return (
    <Comp
      onClick={onClick}
      disabled={disabled}
      className="flex w-full items-center gap-3 border-b border-border p-4 text-left last:border-b-0 transition disabled:opacity-50 enabled:active:bg-muted"
    >
      <div
        className={`grid size-9 place-items-center rounded-xl ${
          destructive ? "bg-destructive/10 text-destructive" : "bg-primary-soft text-primary"
        }`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className={`text-sm font-semibold ${destructive ? "text-destructive" : ""}`}>
          {label}
        </div>
        {hint && <div className="text-xs text-muted-foreground">{hint}</div>}
      </div>
      {right}
      {chevron && <ChevronRight className="size-4 text-muted-foreground" />}
    </Comp>
  );
}
