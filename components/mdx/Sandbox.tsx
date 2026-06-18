"use client";

import * as React from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  type SandpackFiles,
  type SandpackPredefinedTemplate,
} from "@codesandbox/sandpack-react";

interface SandboxProps {
  template?: SandpackPredefinedTemplate;
  files?: SandpackFiles;
}

const dovetailSandpackTheme = {
  colors: {
    surface1: "#0a0a0a", // Carbon
    surface2: "#141414", // Graphite
    surface3: "#1e1e1e", // Iron
    clickable: "#a7a7a7", // Ash
    base: "#ffffff", // Bone
    disabled: "#7c7c7c", // Mist
    hover: "#ffffff",
    accent: "#6798ff", // Soft Indigo
    error: "#f87171",
    errorSurface: "#991b1b",
  },
  syntax: {
    plain: "#ffffff",
    comment: { color: "#7c7c7c", fontStyle: "italic" as const },
    keyword: "#6798ff",
    tag: "#6798ff",
    punctuation: "#a7a7a7",
    definition: "#ffffff",
    property: "#6798ff",
    static: "#ffffff",
    string: "#a7a7a7",
  },
  font: {
    body: "var(--font-sans)",
    mono: "var(--font-mono)",
    size: "13px",
    lineHeight: "1.6",
  }
};

export function Sandbox({
  template = "react",
  files,
}: SandboxProps) {
  return (
    <div className="my-6 overflow-hidden rounded-cards border border-iron not-prose bg-graphite">
      <SandpackProvider
        template={template}
        files={files}
        theme={dovetailSandpackTheme}
        options={{
          autorun: true,
          recompileMode: "delayed",
          recompileDelay: 500,
        }}
      >
        <SandpackLayout className="!border-0 !rounded-none">
          <SandpackCodeEditor
            showTabs={template === "react"}
            showLineNumbers
            style={{ height: 320 }}
            className="!border-r !border-iron"
          />
          <SandpackPreview 
            style={{ height: 320 }}
            showNavigator={false}
            showRefreshButton={true}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
