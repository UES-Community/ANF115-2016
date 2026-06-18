import type { ReactNode } from "react";
import { BookOpen, FileText, Video, Github, ExternalLink, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export type ReferenceType = "doc" | "video" | "github" | "article" | "link";

interface ReferenceItemProps {
  title: string;
  url: string;
  description?: string;
  type?: ReferenceType;
}

const icons: Record<ReferenceType, ReactNode> = {
  doc: <FileText className="h-5 w-5 text-soft-indigo" />,
  video: <Video className="h-5 w-5 text-soft-indigo" />,
  github: <Github className="h-5 w-5 text-white" />,
  article: <BookOpen className="h-5 w-5 text-soft-indigo" />,
  link: <Globe className="h-5 w-5 text-soft-indigo" />,
};

export function ReferenceItem({ title, url, description, type = "link" }: ReferenceItemProps) {
  const icon = icons[type] || icons.link;
  
  let hostname = "";
  try {
    hostname = new URL(url).hostname;
  } catch {
    hostname = url;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group block rounded-cards border border-iron bg-graphite/40 p-4 transition-all duration-200",
        "hover:border-soft-indigo hover:bg-graphite hover:shadow-md hover:shadow-soft-indigo/5",
        "no-underline"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1 shrink-0 rounded bg-iron p-2 text-ash transition-colors duration-200 group-hover:bg-iron/80 group-hover:text-soft-indigo">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="font-sans text-sm font-semibold text-white group-hover:text-soft-indigo transition-colors duration-200 m-0">
              {title}
            </h4>
            <ExternalLink className="h-3.5 w-3.5 text-ash shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
          {description && (
            <p className="mt-1 text-xs text-bone/85 line-clamp-2 leading-relaxed m-0">
              {description}
            </p>
          )}
          <span className="mt-2.5 inline-block font-mono text-[10px] text-ash/80 tracking-wider uppercase">
            {hostname}
          </span>
        </div>
      </div>
    </a>
  );
}

interface ReferencesProps {
  title?: string;
  children: ReactNode;
}

export function References({ title = "Referencias y Lecturas Recomendadas", children }: ReferencesProps) {
  return (
    <div className="my-8 rounded-cards border border-iron bg-graphite p-6 not-prose">
      <h3 className="mb-4 font-mono text-xs font-semibold text-white tracking-tight uppercase">
        {"// "}{title}
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {children}
      </div>
    </div>
  );
}
