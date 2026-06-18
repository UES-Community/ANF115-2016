"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type Platform = "clone" | "install" | "dev";

const COMMANDS: Record<Platform, string> = {
  clone: "git clone https://github.com/ues-community/ANF115-2016.git",
  install: "pnpm install",
  dev: "pnpm dev",
};

export function InstallCommand() {
  const [platform, setPlatform] = useState<Platform>("clone");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(COMMANDS[platform]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="w-full max-w-lg">
      {/* Tabs */}
      <div className="flex border-b border-iron mb-2">
        <button
          onClick={() => setPlatform("clone")}
          className={`px-4 py-2 text-xs font-mono border-b-2 transition-all cursor-pointer ${
            platform === "clone"
              ? "border-soft-indigo text-white font-medium"
              : "border-transparent text-ash hover:text-white"
          }`}
        >
          1. Clonar Repositorio
        </button>
        <button
          onClick={() => setPlatform("install")}
          className={`px-4 py-2 text-xs font-mono border-b-2 transition-all cursor-pointer ${
            platform === "install"
              ? "border-soft-indigo text-white font-medium"
              : "border-transparent text-ash hover:text-white"
          }`}
        >
          2. Instalar
        </button>
        <button
          onClick={() => setPlatform("dev")}
          className={`px-4 py-2 text-xs font-mono border-b-2 transition-all cursor-pointer ${
            platform === "dev"
              ? "border-soft-indigo text-white font-medium"
              : "border-transparent text-ash hover:text-white"
          }`}
        >
          3. Servidor Dev
        </button>
      </div>

      {/* Command Box */}
      <div className="relative flex items-center justify-between rounded-[8px] bg-graphite border border-iron p-4 font-mono text-sm overflow-hidden group">
        <span className="text-white select-all select-none pr-12 truncate">
          <span className="text-soft-indigo">$ </span>
          {COMMANDS[platform]}
        </span>
        <button
          onClick={handleCopy}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-[4px] bg-iron border border-slate-edge text-ash hover:text-white hover:border-smoke transition-all active:scale-95 cursor-pointer"
          aria-label="Copiar comando"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}
