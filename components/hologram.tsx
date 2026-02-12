"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";

// Project A1: Expanded States for Super Genius Logic [cite: 2026-02-11]
export type HoloState = 
  | "diagnosing"    // 5-Second Self-Diagnosis Protocol
  | "registry_sync" // Master Blueprint Registry scan
  | "expert_council"// Council of Experts discussion
  | "thinking"      // Internal Reasoning Path processing
  | "solo_mode"     // Operating with missing modules
  | "guardian_check"// Ethical Hard-Coding verification
  | "danger"        // Kill Switch or System Overheat
  | "idle" | "listening" | "happy" | "calm";

interface HologramProps {
  state: HoloState;
  isSpeaking: boolean;
  cpuUsage?: number; // Musk Rule: Output monitoring [cite: 2026-02-11]
  isEncapsulated?: boolean; // Ball-in-Ball Rule [cite: 2026-02-11]
}

const stateColors: Record<HoloState, { core: string; glow: string; ring: string; label: string }> = {
  diagnosing: { core: "#60a5fa", glow: "rgba(96, 165, 250, 0.3)", ring: "rgba(96, 165, 250, 0.2)", label: "Self-Diagnosis" },
  registry_sync: { core: "#34d399", glow: "rgba(52, 211, 153, 0.3)", ring: "rgba(52, 211, 153, 0.2)", label: "Registry Sync" },
  expert_council: { core: "#f472b6", glow: "rgba(244, 114, 182, 0.3)", ring: "rgba(244, 114, 182, 0.2)", label: "Expert Council" },
  thinking: { core: "#e2e8f0", glow: "rgba(226, 232, 240, 0.2)", ring: "rgba(226, 232, 240, 0.1)", label: "Reasoning Path" },
  solo_mode: { core: "#fbbf24", glow: "rgba(251, 191, 36, 0.3)", ring: "rgba(251, 191, 36, 0.2)", label: "Solo Mode" },
  guardian_check: { core: "#818cf8", glow: "rgba(129, 140, 248, 0.3)", ring: "rgba(129, 140, 248, 0.2)", label: "Guardian Protocol" },
  danger: { core: "#ef4444", glow: "rgba(239, 68, 68, 0.4)", ring: "rgba(239, 68, 68, 0.3)", label: "System Freeze" },
  idle: { core: "#3b82f6", glow: "rgba(59, 130, 246, 0.2)", ring: "rgba(59, 130, 246, 0.15)", label: "Ready" },
  listening: { core: "#10b981", glow: "rgba(16, 185, 129, 0.3)", ring: "rgba(16, 185, 129, 0.2)", label: "Listening" },
  happy: { core: "#fb923c", glow: "rgba(251, 146, 60, 0.3)", ring: "rgba(251, 146, 60, 0.2)", label: "Delighted" },
  calm: { core: "#c084fc", glow: "rgba(192, 132, 252, 0.3)", ring: "rgba(192, 132, 252, 0.2)", label: "Soothing" },
};

export function Hologram({ state, isSpeaking, cpuUsage = 0, isEncapsulated = true }: HologramProps) {
  const colors = stateColors[state];
  const s = 160; // Optimized size for mobile-first scalability [cite: 2026-02-11]

  // Musk Rule: Maximize efficiency by pre-calculating orbit [cite: 2026-02-11]
  const particles = useMemo(() => 
    Array.from({ length: state === "expert_council" ? 12 : 6 }, (_, i) => ({
      id: i,
      delay: i * 0.2,
      duration: state === "thinking" ? 2 : 4
    })), [state]);

  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: s, height: s }}>
      
      {/* Ball-in-Ball Rule: Layered Encapsulation [cite: 2026-02-11] */}
      <AnimatePresence>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`layer-${i}`}
            className="absolute rounded-full border border-dashed"
            style={{ 
              width: s * (0.6 + i * 0.2), 
              height: s * (0.6 + i * 0.2), 
              borderColor: colors.ring,
              opacity: isEncapsulated ? 1 : 0.2
            }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </AnimatePresence>

      {/* Council of Experts: Multiple orbiting sub-nodes [cite: 2026-02-11] */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute h-2 w-2 rounded-full shadow-lg"
          style={{ background: colors.core }}
          animate={{
            rotate: 360,
            scale: isSpeaking ? [1, 1.5, 1] : 1
          }}
          transition={{
            rotate: { duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay },
            scale: { duration: 0.5, repeat: isSpeaking ? Infinity : 0 }
          }}
        >
          <div className="absolute top-10 h-1 w-1 rounded-full bg-inherit opacity-50" />
        </motion.div>
      ))}

      {/* Core Brain: With Internal Critique Pulse [cite: 2026-02-11] */}
      <motion.div
        className="relative z-10 rounded-full flex items-center justify-center shadow-2xl"
        style={{
          width: s * 0.35,
          height: s * 0.35,
          background: `radial-gradient(circle at 30% 30%, ${colors.core}, ${colors.core}aa)`,
          boxShadow: `0 0 40px ${colors.glow}, inset 0 0 10px rgba(255,255,255,0.2)`
        }}
        animate={{
          scale: state === "diagnosing" ? [1, 1.1, 1] : isSpeaking ? [1, 1.25, 0.95, 1.1, 1] : [1, 1.05, 1],
          opacity: state === "danger" ? [1, 0.3, 1] : 1
        }}
        transition={{ duration: isSpeaking ? 0.4 : 2, repeat: Infinity }}
      >
        {/* Hidden Reasoning Path: Subtle inner lines [cite: 2026-02-11] */}
        {state === "thinking" && (
          <motion.div 
            className="absolute inset-2 border-t border-white/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
      </motion.div>

      {/* Neural Status Label */}
      <div className="absolute -bottom-8 flex flex-col items-center">
        <motion.span 
          className="text-[10px] font-black uppercase tracking-[0.2em]"
          style={{ color: colors.core, textShadow: `0 0 10px ${colors.glow}` }}
        >
          {colors.label}
        </motion.span>
        {cpuUsage > 0 && (
          <span className="text-[8px] text-white/40 mt-1 font-mono">Load: {cpuUsage}%</span>
        )}
      </div>

    </div>
  );
          }
            
