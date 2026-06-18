"use client";

import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/content";

interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  if (items.length === 0) return null;

  return (
    <nav
      className={cn("hidden xl:block", className)}
      aria-label="Tabla de contenidos"
    >
      <p className="mb-4 text-xs font-mono font-bold tracking-wider text-pewter uppercase">
        {"// EN_ESTA_PAGINA"}
      </p>
      <ul className="space-y-2.5 text-xs font-mono">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block text-ash transition-colors hover:text-soft-indigo",
                item.level === 3 && "pl-4"
              )}
            >
              {item.text.toLowerCase().replace(/\s+/g, "-")}
            </a>
          </li>
        ))}
      </ul>
    </nav>

  );
}
