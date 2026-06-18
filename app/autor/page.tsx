"use client";

import * as React from "react";
import Link from "next/link";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import LinkExt from "@tiptap/extension-link";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { Markdown } from "tiptap-markdown";
import {
  ArrowLeft,
  Download,
  Eye,
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  Code,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/toaster";

const lowlight = createLowlight(common);

export default function AuthorPage() {
  const { toast } = useToast();
  const [title, setTitle] = React.useState("Nuevo tema");
  const [description, setDescription] = React.useState("");
  const [section, setSection] = React.useState("introduccion");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      LinkExt.configure({ openOnClick: false }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Underline,
      CodeBlockLowlight.configure({ lowlight }),
      Placeholder.configure({
        placeholder: "Escribe el contenido del tema en formato Markdown/MDX...",
      }),
      Markdown.configure({
        html: false,
        transformPastedText: true,
        transformCopiedText: true,
      }),
    ],
    content: "<h2>Introducción</h2><p>Desarrolla el contenido del tema aquí...</p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none min-h-[400px] focus:outline-none text-bone font-sans leading-relaxed",
      },
    },
  });

  const getMarkdown = () => {
    if (!editor) return "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const storage = editor.storage as any;
    return storage.markdown?.getMarkdown?.() ?? editor.getText();
  };

  const exportMdx = () => {
    const markdown = getMarkdown();
    const frontmatter = `---
title: "${title}"
description: "${description}"
section: ${section}
order: 99
---

`;
    const mdx = frontmatter + markdown;
    const blob = new Blob([mdx], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, "-")}.mdx`;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Exportado",
      description: "El archivo MDX se ha descargado correctamente.",
    });
  };

  if (!editor) return null;

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-carbon text-bone font-sans selection:bg-soft-indigo selection:text-black">
        {/* Header */}
        <header className="border-b border-iron bg-carbon/80 backdrop-blur-md sticky top-0 z-50">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="cursor-pointer">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver
              </Link>
            </Button>
            <h1 className="font-mono text-sm font-semibold tracking-tight text-white select-none">
              editor-temas<span className="text-soft-indigo">.tsx</span>
            </h1>
            <div className="w-16"></div> {/* Spacer to keep layout balanced */}
          </div>
        </header>

        {/* Main Form and Editor */}
        <main className="mx-auto max-w-6xl px-6 py-8 space-y-8">
          {/* Metadata Inputs */}
          <div className="bg-graphite border border-iron rounded-cards p-6 grid gap-6 sm:grid-cols-3">
            <div className="space-y-1.5">
              <label htmlFor="title" className="text-xs font-mono font-medium text-ash">
                {"// TITULO_TEMA"}
              </label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Análisis de Razones Financieras"
                className="w-full rounded-[8px] border border-iron bg-iron text-white px-3 py-2 text-sm focus:border-soft-indigo focus:outline-none transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="description" className="text-xs font-mono font-medium text-ash">
                {"// DESCRIPCION"}
              </label>
              <input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ej. Introducción a ratios de liquidez..."
                className="w-full rounded-[8px] border border-iron bg-iron text-white px-3 py-2 text-sm focus:border-soft-indigo focus:outline-none transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="section" className="text-xs font-mono font-medium text-ash">
                {"// SECCION_UNIDAD"}
              </label>
              <select
                id="section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full rounded-[8px] border border-iron bg-iron text-white px-3 py-2 text-sm focus:border-soft-indigo focus:outline-none transition-colors appearance-none cursor-pointer"
              >
                <option value="introduccion" className="bg-graphite">1. Conceptos Básicos de Finanzas</option>
                <option value="analisis-estados" className="bg-graphite">2. Técnicas de Análisis Financiero</option>
                <option value="planificacion" className="bg-graphite">3. Planificación Financiera</option>
                <option value="activo-circulante" className="bg-graphite">4. Administración del Activo Circulante</option>
              </select>
            </div>
          </div>

          {/* Editor Container */}
          <div className="bg-graphite border border-iron rounded-cards overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 border-b border-iron bg-iron/50 p-2 items-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-[4px] hover:bg-iron cursor-pointer"
                onClick={() => editor.chain().focus().toggleBold().run()}
                aria-label="Negrita"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-[4px] hover:bg-iron cursor-pointer"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                aria-label="Cursiva"
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-[4px] hover:bg-iron cursor-pointer"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                aria-label="Título 1"
              >
                <Heading1 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-[4px] hover:bg-iron cursor-pointer"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                aria-label="Título 2"
              >
                <Heading2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-[4px] hover:bg-iron cursor-pointer"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                aria-label="Lista"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-[4px] hover:bg-iron cursor-pointer"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                aria-label="Bloque de código"
              >
                <Code className="h-4 w-4" />
              </Button>

              <div className="ml-auto">
                <Button size="sm" onClick={exportMdx} className="h-8 cursor-pointer">
                  <Download className="mr-2 h-3.5 w-3.5" />
                  Exportar MDX
                </Button>
              </div>
            </div>

            {/* Editor Workspace with Tabs */}
            <div className="p-6">
              <Tabs defaultValue="edit" className="space-y-6">
                <TabsList className="bg-iron p-1 rounded-full inline-flex border border-iron gap-1">
                  <TabsTrigger
                    value="edit"
                    className="rounded-full px-4 py-1.5 text-xs font-mono text-ash data-[state=active]:bg-white data-[state=active]:text-carbon cursor-pointer transition-all"
                  >
                    Editar
                  </TabsTrigger>
                  <TabsTrigger
                    value="preview"
                    className="rounded-full px-4 py-1.5 text-xs font-mono text-ash data-[state=active]:bg-white data-[state=active]:text-carbon cursor-pointer transition-all flex items-center gap-1"
                  >
                    <Eye className="h-3 w-3" />
                    Vista previa
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="edit" className="focus-visible:outline-none">
                  <div className="rounded-cards border border-iron bg-carbon p-4 min-h-[420px] focus-within:border-slate-edge transition-all">
                    <EditorContent editor={editor} />
                  </div>
                </TabsContent>
                
                <TabsContent value="preview" className="focus-visible:outline-none">
                  <div
                    className="prose-course rounded-cards border border-iron bg-carbon p-6 min-h-[420px] overflow-auto"
                    dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}
