import type { ReactNode } from "react";
import { Info, Lightbulb, AlertTriangle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutType = "info" | "tip" | "warning" | "danger";

const styles: Record<
  CalloutType,
  { bg: string; border: string; icon: ReactNode }
> = {
  info: {
    bg: "bg-callout-info",
    border: "border-callout-info-border",
    icon: <Info className="h-5 w-5 text-soft-indigo" />,
  },
  tip: {
    bg: "bg-callout-tip",
    border: "border-callout-tip-border",
    icon: <Lightbulb className="h-5 w-5 text-soft-indigo" />,
  },
  warning: {
    bg: "bg-callout-warning",
    border: "border-callout-warning-border",
    icon: <AlertTriangle className="h-5 w-5 text-yellow-450" />,
  },
  danger: {
    bg: "bg-callout-danger",
    border: "border-callout-danger-border",
    icon: <AlertCircle className="h-5 w-5 text-red-400" />,
  },
};

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

export function Callout({ type = "info", title, children }: CalloutProps) {
  const style = styles[type];

  return (
    <div
      className={cn(
        "my-6 flex gap-3 rounded-cards border p-4 not-prose",
        style.bg,
        style.border
      )}
      role="note"
    >
      <div className="mt-0.5 shrink-0">{style.icon}</div>
      <div className="min-w-0 flex-1">
        {title && (
          <p className="mb-1 font-mono text-xs font-semibold text-white tracking-tight uppercase">{"// "}{title}</p>
        )}
        <div className="text-sm leading-relaxed text-bone">
          {children}
        </div>
      </div>
    </div>
  );
}
