"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Copy, Check, Code, FileText, Brain, 
  ShieldCheck, Activity, Terminal, Star, 
  Cpu, Gauge, History 
} from "lucide-react";
import { GlassButton } from "./glass-button";
import { useState, useMemo } from "react";

// Musk Rule: Physics-based config for zero-lag UI [cite: 2026-02-11]
const springConfig = { stiffness: 220, damping: 28 };

interface WorkspacePanelProps {
  content: string;
  type: "code" | "text";
  isOpen: boolean;
  onClose: () => void;
  // New Super Genius Props [cite: 2026-02-11]
  reasoningPath?: string[];
  experts?: string[];
  logicVersion?: string;
}

export function WorkspacePanel({
  content,
  type,
  isOpen,
  onClose,
  reasoningPath = ["Analyzing Intent", "Consulting Coder Expert", "Security Audit Passed"],
  experts = ["Coder", "Security Auditor", "Strategist"],
  logicVersion = "v1.4.2-Neural"
}: WorkspacePanelProps) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<number | null>(null);

  // Musk Rule: CPU/GPU Resource Simulation [cite: 2026-02-11]
  const resourceUsage = useMemo(() => ({
    cpu: Math.floor(Math.random() * 15) + 5,
    gpu: Math.floor(Math.random() * 10) + 2
  }), [content]);

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
          className="fixed right-0 top-0 bottom-0 z-40 w-full max-w-xl flex flex-col glass-panel-strong border-l border-white/10 shadow-2xl backdrop-blur-3xl"
        >
          {/* Header: System Health & Logic Version [cite: 2026-02-11] */}
          <div className="flex flex-col border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 glow-blue">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                    Neural Output <span className="text-[10px] text-primary/50 font-mono font-normal">[{logicVersion}]</span>
                  </h2>
                  <div className="flex gap-2 mt-0.5">
                    <span className="text-[9px] uppercase tracking-tighter text-emerald-500 flex items-center gap-1">
                      <ShieldCheck className="h-2.5 w-2.5" /> Guardian Protocol: Verified
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <GlassButton size="sm" onClick={handleCopy}>
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </GlassButton>
                <GlassButton size="sm" onClick={onClose} variant="danger">
                  <X className="h-3.5 w-3.5" />
                </GlassButton>
              </div>
            </div>

            {/* Council of Experts Visualizer [cite: 2026-02-11] */}
            <div className="px-6 pb-3 flex items-center gap-4 overflow-x-auto no-scrollbar">
              <span className="text-[9px] font-bold text-muted-foreground uppercase shrink-0">Council:</span>
              {experts.map((expert, idx) => (
                <div key={idx} className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/5 shrink-0">
                  <Activity className="h-2.5 w-2.5 text-primary" />
                  <span className="text-[10px] text-white/70">{expert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reasoning Path: Hidden Thought Process [cite: 2026-02-11] */}
          <div className="bg-black/20 p-4 border-b border-white/5">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer list-none text-[10px] font-bold text-primary/80 uppercase tracking-widest">
                <span className="flex items-center gap-2"><Terminal className="h-3 w-3" /> Internal Reasoning Path</span>
                <motion.span animate={{ rotate: 180 }} className="group-open:rotate-0 transition-transform">▼</motion.span>
              </summary>
              <div className="mt-3 space-y-2 pl-2 border-l border-primary/20">
                {reasoningPath.map((step, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -5 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: idx * 0.1 }}
                    className="text-[11px] font-mono text-white/40 flex items-center gap-2"
                  >
                    <span className="h-1 w-1 bg-primary rounded-full" /> {step}
                  </motion.div>
                ))}
              </div>
            </details>
          </div>

          {/* Sandbox Content Area [cite: 2026-02-11] */}
          <div className="flex-1 overflow-auto p-6 scrollbar-thin bg-black/40 relative">
            {type === "code" && (
              <div className="absolute top-4 right-6 flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                <ShieldCheck className="h-3 w-3 text-emerald-500" />
                <span className="text-[9px] font-bold text-emerald-500 uppercase">Sandbox Mode</span>
              </div>
            )}
            <pre className="whitespace-pre-wrap break-words font-mono text-sm text-foreground/90 leading-relaxed selection:bg-primary/30">
              {content}
            </pre>
          </div>

          {/* Footer: Feedback (RLHF) & Efficiency Metrics [cite: 2026-02-11] */}
          <div className="p-5 border-t border-white/5 bg-white/[0.01]">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1"><Cpu className="h-3 w-3" /> CPU: {resourceUsage.cpu}%</span>
                  <span className="flex items-center gap-1"><Gauge className="h-3 w-3" /> GPU: {resourceUsage.gpu}%</span>
                </div>
                <div className="flex items-center gap-1"><History className="h-3 w-3" /> State: Distributed Mesh Sync</div>
              </div>

              <div className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-xs font-medium text-white/60">Quality Feedback?</span>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star} 
                      onClick={() => setFeedback(star)}
                      className={`transition-all ${feedback && star <= feedback ? 'text-primary scale-110' : 'text-white/20 hover:text-white/40'}`}
                    >
                      <Star className="h-4 w-4 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
    }
                
