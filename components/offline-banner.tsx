"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  WifiOff, 
  HardDrive, 
  ShieldCheck, 
  Cpu, 
  ZapOff 
} from "lucide-react";

// Musk Rule: High-efficiency physics for zero CPU lag during offline state [cite: 2026-02-11]
const springConfig = { stiffness: 200, damping: 25 };

interface AdvancedSoloModeProps {
  isOffline: boolean;
  meshConnected: boolean; // Distributed Mesh Status [cite: 2026-02-11]
  diagnosisPass: boolean; // 5-Second Self-Diagnosis Result [cite: 2026-02-11]
}

export function OfflineBanner({ 
  isOffline, 
  meshConnected = true, 
  diagnosisPass = true 
}: AdvancedSoloModeProps) {
  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ type: "spring", ...springConfig }}
          className="fixed top-2 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-2xl"
        >
          {/* Ball-in-Ball Rule: Encapsulated Layered UI [cite: 2026-02-11] */}
          <div className="glass-panel-strong relative overflow-hidden rounded-2xl border border-yellow-500/30 bg-black/80 p-3 backdrop-blur-2xl shadow-[0_0_30px_rgba(234,179,8,0.15)]">
            
            {/* Solo Mode Scanning Animation [cite: 2026-02-11] */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-3">
              
              {/* Left: Primary Status (Hinglish Intent) [cite: 2026-02-11] */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-500/20 glow-yellow">
                  <ZapOff className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-yellow-500">Solo Mode Active</h4>
                  <p className="text-[10px] font-medium text-white/70">
                    Bhai, Cloud se nata tut gaya hai, par Local Brain (D/E Mesh) bilkul ready hai! [cite: 2026-02-11]
                  </p>
                </div>
              </div>

              {/* Right: Distributed Mesh Health Stats [cite: 2026-02-11] */}
              <div className="flex items-center gap-4 border-l border-white/10 pl-4">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-400 uppercase">
                    <HardDrive className="h-3 w-3" /> Mesh: {meshConnected ? "Linked" : "Broken"}
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-blue-400 uppercase mt-1">
                    <ShieldCheck className="h-3 w-3" /> Diag: {diagnosisPass ? "OK" : "Error"}
                  </div>
                </div>
                
                <div className="h-8 w-px bg-white/10 mx-1" />
                
                <div className="flex flex-col items-end">
                   <span className="text-[9px] text-white/30 uppercase font-bold tracking-tighter">Distributed Processing</span>
                   <span className="text-[10px] font-mono text-yellow-500/80">Offline Intelligence v1.0</span>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
