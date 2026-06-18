"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CodeBlockClientProps {
  html: string;
  rawCode: string;
  title?: string;
  showLineNumbers?: boolean;
}

export function CodeBlockClient({
  html,
  rawCode,
  title,
  showLineNumbers = true,
}: CodeBlockClientProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-6 overflow-hidden rounded-cards border border-iron bg-graphite">
      {title && (
        <div className="flex items-center justify-between border-b border-iron bg-iron/50 px-4 py-2">
          <span className="text-xs font-mono text-ash font-medium">{title}</span>
        </div>
      )}
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-3 top-3 z-10 h-7 w-7 rounded-[4px] bg-iron border border-slate-edge text-ash hover:text-white opacity-0 group-hover:opacity-100 transition-all active:scale-95 cursor-pointer"
          onClick={handleCopy}
          aria-label="Copiar código"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
        <div
          className={cn(
            "overflow-x-auto p-4 text-xs md:text-sm font-mono [&_pre]:!bg-transparent [&_pre]:!m-0 [&_code]:font-mono [&_code]:!text-[inherit]",
            showLineNumbers && "[&_.line]:inline-block [&_.line]:w-full"
          )}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
