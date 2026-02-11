"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Code, FileText } from "lucide-react";
import { GlassButton } from "./glass-button";
import { useState } from "react";

const springConfig = { stiffness: 260, damping: 20 };

interface WorkspacePanelProps {
  content: string;
  type: "code" | "text";
  isOpen: boolean;
  onClose: () => void;
}

export function WorkspacePanel({
  content,
  type,
  isOpen,
  onClose,
}: WorkspacePanelProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", ...springConfig }}
          className="fixed right-0 top-0 bottom-0 z-40 w-full max-w-lg flex flex-col glass-panel-strong border-l border-border"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div className="flex items-center gap-2">
              {type === "code" ? (
                <Code className="h-4 w-4 text-primary" />
              ) : (
                <FileText className="h-4 w-4 text-primary" />
              )}
              <span className="text-sm font-medium text-foreground">
                {type === "code" ? "Code Output" : "Generated Content"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <GlassButton size="sm" onClick={handleCopy}>
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-green-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </GlassButton>
              <GlassButton size="sm" onClick={onClose}>
                <X className="h-3.5 w-3.5" />
              </GlassButton>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-5 scrollbar-thin">
            <pre className="whitespace-pre-wrap break-words font-mono text-sm text-foreground/90 leading-relaxed">
              {content}
            </pre>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
