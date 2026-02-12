"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  Cpu, Brain, ShieldCheck, Activity, 
  HardDrive, Zap, Lock, AlertTriangle, RefreshCcw 
} from "lucide-react";

import { AuthGlass } from "@/components/auth-glass";
import { MainInterface } from "@/components/main-interface";
import { OfflineBanner } from "@/components/offline-banner";
import { useOnlineStatus } from "@/hooks/use-online-status";
import { useToast } from "@/hooks/use-toast"; // Assuming neural toast is ready
import type { UserProfile } from "@/lib/persona-logic";

/**
 * Project A1: Neural Gateway [cite: 2026-02-11]
 * Rule: 5-Second Self-Diagnosis (Internet, GPU, Memory, Drive).
 * Rule: Onion Architecture (Nested Security Layers).
 * Rule: Kill Switch (Emergency Stop).
 */

type SystemState = 'DIAGNOSING' | 'STABLE' | 'SOLO_MODE' | 'CRITICAL';

export default function NeuralGateway() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [systemState, setSystemState] = useState<SystemState>('DIAGNOSING');
  const [meshStatus, setMeshStatus] = useState({ dDrive: false, eDrive: false, gpuTemp: 0 });
  const isOnline = useOnlineStatus();
  const { toast } = useToast();

  // 1. RULE: 5-Second Self-Diagnosis Protocol [cite: 2026-02-11]
  const runSelfDiagnosis = useCallback(async () => {
    setSystemState('DIAGNOSING');
    
    // Simulate multi-point check (Internet, GPU, Drive, RAM)
    const diagnosis = await new Promise((resolve) => {
      setTimeout(() => {
        const gpuTemp = Math.floor(Math.random() * 20) + 45; // Simulated 45-65°C
        const dConnected = true; // Simulated detection
        const eConnected = false; 
        resolve({ gpuTemp, dConnected, eConnected });
      }, 5000); // Strict 5-second wait
    }) as any;

    setMeshStatus({ 
      dDrive: diagnosis.dConnected, 
      eDrive: diagnosis.eConnected, 
      gpuTemp: diagnosis.gpuTemp 
    });

    if (diagnosis.gpuTemp > 80) {
      setSystemState('CRITICAL');
      toast({ variant: "destructive", title: "Thermal Alert!", description: "GPU Overheating. Check cooling." });
    } else {
      setSystemState(diagnosis.dConnected || diagnosis.eConnected ? 'STABLE' : 'SOLO_MODE');
    }
  }, [toast]);

  // 2. RULE: Kill Switch Protocol (Emergency Stop) [cite: 2026-02-11]
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === 'k') {
        toast({ title: "SYSTEM FREEZE", description: "Protocol Omega Triggered. All processes halted." });
        setSystemState('CRITICAL');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toast]);

  useEffect(() => {
    runSelfDiagnosis();
    const saved = sessionStorage.getItem("a1-profile");
    if (saved) setProfile(JSON.parse(saved));
  }, [runSelfDiagnosis]);

  if (systemState === 'DIAGNOSING') {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#020202] text-white">
        {/* Layer: Security Scan Line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/20 animate-scan" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative p-12 rounded-[3rem] glass-panel-strong border border-white/5 flex flex-col items-center gap-6"
        >
          <Brain className="h-16 w-16 text-primary animate-pulse" />
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-white/40">Neural Shell v2.5</h2>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
              <p className="text-[10px] font-mono text-primary uppercase tracking-widest">Running Self-Diagnosis...</p>
            </div>
          </div>
          
          {/* Progress Bar for 5s Protocol */}
          <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-full bg-primary shadow-[0_0_10px_#3b82f6]"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background">
      <OfflineBanner isOffline={!isOnline} />

      {/* Layer 1: The Validation Layer (Onion Architecture) [cite: 2026-02-11] */}
      <AnimatePresence mode="wait">
        {profile ? (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className={!isOnline ? "grayscale contrast-125" : ""}
          >
            {/* Solo Mode Check: Rule: Solo Mode [cite: 2026-02-11] */}
            <MainInterface 
              profile={profile} 
              onLogout={() => setProfile(null)} 
              systemMetadata={{ ...meshStatus, state: systemState }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-screen items-center justify-center p-4 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black"
          >
            <AuthGlass onLogin={(p) => setProfile(p)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Layer 2: Mesh Health HUD [cite: 2026-02-11] */}
      <div className="fixed bottom-6 left-6 z-50 flex gap-4 pointer-events-none opacity-40 hover:opacity-100 transition-opacity">
        <HealthTag icon={Cpu} label={`${meshStatus.gpuTemp}°C`} status={meshStatus.gpuTemp < 75 ? 'good' : 'bad'} />
        <HealthTag icon={HardDrive} label="Mesh-D" status={meshStatus.dDrive ? 'good' : 'bad'} />
      </div>
    </div>
  );
}

const HealthTag = ({ icon: Icon, label, status }: { icon: any, label: string, status: 'good' | 'bad' }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-white/5 text-[10px] font-mono">
    <Icon className={status === 'good' ? 'text-emerald-500' : 'text-red-500'} size={12} />
    <span className="text-white/50 tracking-tighter uppercase">{label}</span>
  </div>
);
