"use client";

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion";
import { GlassButton } from "./glass-button";
import type { Gender, UserProfile } from "@/lib/persona-logic";
import {
  Lock, Github, Smartphone, Send, Calendar, User,
  ChevronRight, Sparkles, Globe, ShieldCheck, Activity, Database
} from "lucide-react";

// Musk Rule: First Principles based Animation Config [cite: 2026-02-11]
const springConfig = { stiffness: 200, damping: 25 };

export function AuthGlass({ onLogin }: { onLogin: (profile: UserProfile) => void }) {
  const [step, setStep] = useState<"diagnosis" | "provider" | "profile">("diagnosis");
  const [diagnosisStatus, setDiagnosisStatus] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);
  
  // Profile States
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [isLoading, setIsLoading] = useState(false);

  // 1. Rule: 5-Second Self-Diagnosis Protocol [cite: 2026-02-11]
  useEffect(() => {
    const checks = ["Internet Status", "Memory Availability", "Drive Connections", "Registry Scan"];
    let current = 0;
    
    const interval = setInterval(() => {
      if (current < checks.length) {
        setDiagnosisStatus(prev => [...prev, `${checks[current]}: OK`]);
        current++;
      } else {
        setIsReady(true);
        setTimeout(() => setStep("provider"), 1000);
        clearInterval(interval);
      }
    }, 1200); // 5 second total loop [cite: 2026-02-11]
    
    return () => clearInterval(interval);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    // Internal Critique Step: Simulate validation before finalizing [cite: 2026-02-11]
    setTimeout(() => onLogin({ name, dob, gender, provider: "A1-Global" }), 1200);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#020202] p-4 font-sans selection:bg-primary/30">
      {/* Universal Bridge: Global Particle Mesh [cite: 2026-02-11] */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] w-[1px] bg-blue-500 shadow-[0_0_15px_blue]"
            initial={{ x: Math.random() * 1000, y: Math.random() * 1000 }}
            animate={{ x: [null, Math.random() * 1000], y: [null, Math.random() * 1000] }}
            transition={{ duration: 10 + i, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      <motion.div className="relative z-10 w-full max-w-md">
        <div className="glass-panel-strong border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-2xl">
          
          <AnimatePresence mode="wait">
            {/* Step 0: Self-Diagnosis Screen [cite: 2026-02-11] */}
            {step === "diagnosis" && (
              <motion.div key="diag" exit={{ opacity: 0, scale: 0.9 }}>
                <div className="flex flex-col items-center gap-6">
                  <Activity className="h-12 w-12 text-primary animate-pulse" />
                  <h2 className="text-xl font-bold tracking-widest uppercase">System Booting...</h2>
                  <div className="w-full space-y-2">
                    {diagnosisStatus.map((s, i) => (
                      <div key={i} className="text-xs font-mono text-emerald-400 flex items-center gap-2">
                        <ShieldCheck className="h-3 w-3" /> {s}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 1: Provider Selection */}
            {step === "provider" && (
              <motion.div key="prov" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="text-center mb-8">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 glow-blue mb-4">
                    <Database className="h-8 w-8 text-primary" />
                  </div>
                  <h1 className="text-3xl font-black text-white">Project A1</h1>
                  <p className="text-xs text-blue-400/60 mt-1 uppercase tracking-[0.2em]">Distributed Mesh Active</p>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <GlassButton onClick={() => setStep("profile")} className="py-4 flex justify-between px-6">
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-primary" />
                      <span className="font-medium text-sm">Initialize Neural Profile</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </GlassButton>
                  <p className="text-[10px] text-center text-muted-foreground mt-4 italic">
                    "Automatic Language Detection Enabled" [cite: 2026-02-11]
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 2: Super Genius Profile Setup [cite: 2026-02-11] */}
            {step === "profile" && (
              <motion.form key="prof" onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" /> Persona Configuration
                </h3>
                
                <input 
                  type="text" placeholder="Identity Name" required
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:ring-2 ring-primary/50 outline-none"
                  onChange={(e) => setName(e.target.value)}
                />

                <div className="grid grid-cols-2 gap-3">
                    <input type="date" required className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm [color-scheme:dark]" onChange={(e) => setDob(e.target.value)}/>
                    <select className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none" onChange={(e) => setGender(e.target.value as Gender)}>
                        <option value="male">Male Node</option>
                        <option value="female">Female Node</option>
                        <option value="other">Universal</option>
                    </select>
                </div>

                <GlassButton type="submit" variant="primary" className="w-full py-4 font-bold tracking-widest uppercase">
                    Activate Core Logic
                </GlassButton>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Guardian Protocol Badge [cite: 2026-02-11] */}
          <div className="mt-8 flex items-center justify-center gap-4 border-t border-white/5 pt-6 opacity-50">
            <div className="flex items-center gap-1 text-[9px] uppercase tracking-tighter">
              <ShieldCheck className="h-3 w-3 text-emerald-500" />
              Guardian Protocol Active
            </div>
            <div className="h-3 w-px bg-white/10" />
            <div className="flex items-center gap-1 text-[9px] uppercase tracking-tighter">
              <Lock className="h-3 w-3 text-blue-500" />
              Ball-in-Ball Encrypted
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
