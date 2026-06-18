"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, ChevronLeft, ChevronRight } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { TableOfContents } from "@/components/table-of-contents";
import { NotesPanel } from "@/components/notes-panel";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { SectionMeta, TocItem, LessonMeta } from "@/lib/content";

interface DocsLayoutProps {
  children: React.ReactNode;
  sections: SectionMeta[];
  toc: TocItem[];
  slug: string;
  title: string;
  description?: string;
  progress: number;
  prev: LessonMeta | null;
  next: LessonMeta | null;
}

export function DocsLayout({
  children,
  sections,
  toc,
  slug,
  title,
  description,
  progress,
  prev,
  next,
}: DocsLayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <TooltipProvider>
      <div className="flex min-h-screen flex-col bg-carbon text-bone font-sans selection:bg-soft-indigo selection:text-black">
        {/* Top Header */}
        <header className="sticky top-0 z-40 border-b border-iron bg-carbon/85 backdrop-blur-md">
          <div className="flex h-14 items-center gap-4 px-6">
            <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden hover:bg-iron"
                  aria-label="Abrir menú"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="h-[80vh] max-w-sm overflow-hidden p-0 bg-graphite border-iron">
                <DialogHeader className="sr-only">
                  <DialogTitle>Navegación de la materia</DialogTitle>
                </DialogHeader>
                <Sidebar sections={sections} className="w-full border-0" />
              </DialogContent>
            </Dialog>

            <div className="flex flex-1 items-center justify-between">
              {/* Breadcrumbs */}
              <div className="hidden lg:flex items-center gap-2 font-mono text-xs text-ash">
                <Link
                  href="/"
                  className="hover:text-soft-indigo transition-colors"
                >
                  inicio
                </Link>
                <span className="text-smoke">/</span>
                <span className="text-white font-medium">{title.toLowerCase().replace(/\s+/g, "-")}</span>
              </div>

              {/* Progress & Actions */}
              <div className="ml-auto flex items-center gap-6">
                <div className="hidden items-center gap-3 sm:flex">
                  <span className="text-xs font-mono text-ash">
                    progreso:
                  </span>
                  <Progress value={progress} className="w-24 bg-iron" />
                  <span className="text-xs font-mono text-bone font-semibold">{progress}%</span>
                </div>
                
                <Separator orientation="vertical" className="h-4 bg-iron hidden sm:block" />

                <Link
                  href="/autor"
                  className="text-xs font-mono text-ash hover:text-soft-indigo transition-colors"
                >
                  {"// autor"}
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Workspace Layout */}
        <div className="flex flex-1">
          {/* Desktop Left Sidebar */}
          <Sidebar sections={sections} className="hidden lg:flex" />

          {/* Main Content Area */}
          <main className="flex flex-1 overflow-hidden">
            <div className="flex flex-1 flex-col overflow-y-auto">
              <article className="mx-auto w-full max-w-3xl flex-1 px-8 py-10">
                <header className="mb-10 space-y-3">
                  <div className="text-[12px] font-mono tracking-[0.85px] text-soft-indigo uppercase">
                    Documentación de Curso
                  </div>
                  <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-bone font-sans leading-tight">
                    {title}
                  </h1>
                  {description && (
                    <p className="text-base text-ash leading-relaxed">
                      {description}
                    </p>
                  )}
                </header>

                <div className="prose-course">{children}</div>

                <Separator className="my-10 bg-iron" />

                {/* Lesson Navigation */}
                <nav
                  className="grid gap-4 sm:grid-cols-2"
                  aria-label="Navegación entre temas"
                >
                  {prev ? (
                    <Link
                      href={`/curso/${prev.slug}`}
                      className="group flex items-center gap-3 rounded-[8px] bg-graphite border border-iron p-5 hover:bg-iron hover:border-slate-edge transition-all duration-150"
                    >
                      <ChevronLeft className="h-5 w-5 text-ash group-hover:text-soft-indigo transition-colors shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] font-mono text-ash uppercase tracking-wider">
                          Anterior
                        </p>
                        <p className="text-sm font-semibold text-bone group-hover:text-soft-indigo transition-colors truncate">
                          {prev.title}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {next ? (
                    <Link
                      href={`/curso/${next.slug}`}
                      className="group flex items-center justify-between gap-3 rounded-[8px] bg-graphite border border-iron p-5 hover:bg-iron hover:border-slate-edge transition-all duration-150 text-right"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-mono text-ash uppercase tracking-wider">
                          Siguiente
                        </p>
                        <p className="text-sm font-semibold text-bone group-hover:text-soft-indigo transition-colors truncate">
                          {next.title}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-ash group-hover:text-soft-indigo transition-colors shrink-0" />
                    </Link>
                  ) : (
                    <div />
                  )}
                </nav>
              </article>

              {/* In-page Right TOC for XL screens */}
              <aside className="hidden w-60 shrink-0 border-l border-iron p-6 xl:block bg-carbon">
                <TableOfContents items={toc} />
              </aside>
            </div>

            {/* Desktop Notes Drawer */}
            <NotesPanel slug={slug} className="hidden md:flex border-l border-iron" />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
