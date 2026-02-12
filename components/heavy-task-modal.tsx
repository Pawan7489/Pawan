"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Download, X, Activity, Brain, Cpu } from "lucide-react";
import { GlassButton } from "./glass-button";

// Musk Rule: High-efficiency physics for zero lag [cite: 2026-02-11]
const springConfig = { stiffness: 300, damping: 25 };

interface SuperGeniusModalProps {
  isOpen: boolean;
  onClose: () => void;
  personaLabel: string;
  systemDiagnosis?: {
    cpuLoad: number;
    memoryAccess: "restricted" | "granted";
    reasoning: string[];
  };
}

export function HeavyTaskModal({
  isOpen,
  onClose,
  personaLabel,
  systemDiagnosis = {
    cpuLoad: 92,
    memoryAccess: "restricted",
    reasoning: ["Analyzing Intent", "Checking Constitution Rule 42", "Detecting Browser Sandbox"]
  }
}: SuperGeniusModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Layer 1: Security Blur (Onion Architecture) [cite: 2026-02-11] */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#050505]/80 backdrop-blur-xl"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ type: "spring", ...springConfig }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 p-4"
          >
            {/* Layer 2: Guardian Shield [cite: 2026-02-11] */}
            <div className="glass-panel-strong relative overflow-hidden rounded-[2.5rem] p-8 border border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.15)]">
              
              {/* Background Scan Animation [cite: 2026-02-11] */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent pointer-events-none"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex flex-col gap-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 glow-red mb-2">
                      <ShieldAlert className="h-6 w-6 text-red-600" />
                    </div>
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">
                      Guardian Protocol Active
                    </span>
                  </div>
                  <GlassButton variant="ghost" className="rounded-full h-8 w-8 p-0" onClick={onClose}>
                    <X className="h-4 w-4" />
                  </GlassButton>
                </div>

                {/* Internal Reasoning Path Visualization [cite: 2026-02-11] */}
                <div className="mb-6 space-y-2 p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-1">
                    <Brain className="h-3 w-3" /> Reasoning Path
                  </div>
                  {systemDiagnosis.reasoning.map((step, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="text-[11px] font-mono text-emerald-500/80 flex items-center gap-2"
                    >
                      <span className="h-1 w-1 rounded-full bg-emerald-500" /> {step}
                    </motion.div>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">
                  System Memory Restriction
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {personaLabel === "Buddy Mode"
                    ? "Dekh dost, mere 'Self-Diagnosis' ne bataya hai ki ye task tere browser ki limit se bahar hai. System crash ho sakta hai! [cite: 2026-02-11]"
                    : "Guardian Logic Error: Task requires Kernel-level access. Browser sandbox cannot execute. Please sync with A1 Core App. [cite: 2026-02-11]"}
                </p>

                {/* Live Stats: Musk Rule for real-time feedback [cite: 2026-02-11] */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase">
                      <Cpu className="h-3 w-3" /> Browser Load
                    </div>
                    <span className="text-sm font-bold text-red-400">{systemDiagnosis.cpuLoad}%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase">
                      <Activity className="h-3 w-3" /> OS Bridge
                    </div>
                    <span className="text-sm font-bold text-yellow-500 capitalize">{systemDiagnosis.memoryAccess}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <GlassButton
                    variant="primary"
                    size="lg"
                    className="w-full flex items-center justify-center gap-3 py-4 font-bold shadow-lg shadow-primary/20"
                    onClick={onClose}
                  >
                    <Download className="h-5 w-5" />
                    Download A1 Core App
                  </GlassButton>
                  <button 
                    className="text-[11px] text-muted-foreground/60 hover:text-white transition-colors text-center"
                    onClick={onClose}
                  >
                    Proceed with limited web-mode
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
