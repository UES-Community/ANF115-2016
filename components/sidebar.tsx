"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen } from "lucide-react";
import { CollapsibleSection } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { SectionMeta } from "@/lib/content";

interface SidebarProps {
  sections: SectionMeta[];
  className?: string;
}

export function Sidebar({ sections, className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex w-64 shrink-0 flex-col border-r border-iron bg-carbon",
        className
      )}
      aria-label="Navegación de la materia"
    >
      <div className="flex items-center gap-2 border-b border-iron px-6 py-4">
        <BookOpen className="h-5 w-5 text-soft-indigo" />
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight text-white hover:text-soft-indigo transition-colors uppercase">
          anf115-2016
        </Link>
      </div>
      <ScrollArea className="flex-1 px-4 py-4">
        <nav className="space-y-6">
          {sections.map((section) => (
            <CollapsibleSection
              key={section.id}
              title={section.title}
              defaultOpen
            >
              <div className="space-y-1 mt-2">
                {section.lessons.map((lesson) => {
                  const href = `/curso/${lesson.slug}`;
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={lesson.slug}
                      href={href}
                      className={cn(
                        "block px-3 py-1.5 text-xs font-mono transition-all",
                        isActive
                          ? "bg-iron border-l-2 border-soft-indigo text-soft-indigo font-semibold pl-2 rounded-r-[4px]"
                          : "text-ash hover:text-white hover:bg-graphite/50 rounded-md"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {lesson.title.toLowerCase().replace(/\s+/g, "-")}
                    </Link>
                  );
                })}
              </div>
            </CollapsibleSection>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}
