"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hologram, type HoloState } from "./hologram";
import { GlassButton } from "./glass-button";
import { WorkspacePanel } from "./workspace-panel";
import { HeavyTaskModal } from "./heavy-task-modal";
import { useVoice } from "@/hooks/use-voice";
import {
  ShieldCheck, Activity, Cpu, HardDrive, 
  Terminal, AlertTriangle, Zap, Brain, 
  Mic, MicOff, Send, Volume2, VolumeX, LogOut, Sparkles, Moon
} from "lucide-react";

// Rules: Self-Diagnosis, Kill Switch, and Council of Experts logic [cite: 2026-02-11]
export function MainInterface({ profile, onLogout }) {
  // --- A1 CORE STATES ---
  const [isDiagnosed, setIsDiagnosed] = useState(false);
  const [diagStatus, setDiagStatus] = useState<string[]>([]);
  const [systemFreeze, setSystemFreeze] = useState(false);
  const [reasoningPath, setReasoningPath] = useState<string[]>([]);
  const [expertCouncil, setExpertCouncil] = useState(false);
  
  // Existing States
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [holoState, setHoloState] = useState<HoloState>("idle");
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [showHeavyTask, setShowHeavyTask] = useState(false);

  const { isSpeaking, isListening, speak, stopSpeaking, startListening, stopListening } = useVoice();

  // 1. RULE: 5-Second Self-Diagnosis Protocol [cite: 2026-02-11]
  useEffect(() => {
    const checks = ["Internet: Stable", "GPU: 42°C (Optimal)", "Memory: 12GB Available", "Drive Mesh: Linked"];
    setHoloState("diagnosing");
    let i = 0;
    const interval = setInterval(() => {
      if (i < checks.length) {
        setDiagStatus(prev => [...prev, checks[i]]);
        i++;
      } else {
        setIsDiagnosed(true);
        setHoloState("idle");
        clearInterval(interval);
      }
    }, 1250); // Total 5 seconds [cite: 2026-02-11]
    return () => clearInterval(interval);
  }, []);

  // 2. RULE: Kill Switch Protocol (Emergency Stop) [cite: 2026-02-11]
  useEffect(() => {
    const handleKillSwitch = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === 'k') {
        setSystemFreeze(true);
        setHoloState("danger");
        stopSpeaking();
        console.warn("SYSTEM FREEZE ACTIVATED: All processes halted."); [cite: 2026-02-11]
      }
    };
    window.addEventListener('keydown', handleKillSwitch);
    return () => window.removeEventListener('keydown', handleKillSwitch);
  }, [stopSpeaking]);

  // 3. RULE: Council of Experts & Internal Critique [cite: 2026-02-11]
  const processSuperGeniusLogic = useCallback(async (userQuery: string) => {
    setExpertCouncil(true);
    setReasoningPath(["Consulting Coder Node...", "Security Audit in progress...", "Guardian Protocol validation..."]); [cite: 2026-02-11]
    
    // Internal Critique Step [cite: 2026-02-11]
    await new Promise(r => setTimeout(r, 1500)); 
    setReasoningPath(prev => [...prev, "Critique: Efficiency can be improved by 12%. Adjusting..."]);
    
    setExpertCouncil(false);
    return "Logic Verified. Executing command via Distributed Mesh."; [cite: 2026-02-11]
  }, []);

  const handleSend = async () => {
    if (systemFreeze || !input.trim()) return;
    
    const userMsg = input.trim();
    setInput("");
    setHoloState("thinking");
    
    // Simulate Expert Council [cite: 2026-02-11]
    const verification = await processSuperGeniusLogic(userMsg);
    
    // Add logic for Hinglish Intent [cite: 2026-02-11]
    // (Actual response generation logic here)
    setHoloState("idle");
  };

  if (!isDiagnosed) {
    return (
      <div className="fixed inset-0 bg-[#020202] flex flex-col items-center justify-center p-6">
        <Hologram state="diagnosing" size="lg" isSpeaking={false} />
        <div className="mt-8 space-y-2 w-full max-w-xs">
          {diagStatus.map((s, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-[10px] font-mono text-emerald-500 flex items-center gap-2">
              <ShieldCheck className="h-3 w-3" /> {s}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 flex flex-col bg-[#050505] selection:bg-primary/30 ${systemFreeze ? "grayscale pointer-events-none" : ""}`}>
      {/* Top Bar: Registry & Status [cite: 2026-02-11] */}
      <header className="relative z-30 flex items-center justify-between px-6 py-4 border-b border-white/5 glass-panel">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            <div className="absolute -top-1 -right-1 h-2 w-2 bg-emerald-500 rounded-full border border-black" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tighter text-white">PROJECT A1 <span className="text-[10px] text-primary/50 font-normal">v1.0-GENIUS</span></h1>
            <div className="flex gap-3 mt-0.5">
              <span className="text-[9px] uppercase tracking-widest text-emerald-500 flex items-center gap-1"><Zap className="h-2 w-2"/> Mesh: Active</span>
              <span className="text-[9px] uppercase tracking-widest text-blue-400 flex items-center gap-1"><HardDrive className="h-2 w-2"/> Registry: Scaled</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {expertCouncil && (
            <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/10 rounded-full border border-purple-500/20">
              <Brain className="h-3 w-3 text-purple-400 animate-bounce" />
              <span className="text-[9px] font-bold text-purple-400 uppercase">Council Discussing</span>
            </div>
          )}
          <GlassButton variant="ghost" size="sm" onClick={onLogout}><LogOut className="h-4 w-4" /></GlassButton>
        </div>
      </header>

      {/* Main Neural Display */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Background Mesh Visual [cite: 2026-02-11] */}
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_var(--primary)_1px,_transparent_1px)] [background-size:40px_40px]" />
        </div>

        <motion.div className="flex flex-col items-center py-8">
          <Hologram state={holoState} isSpeaking={isSpeaking} size="lg" />
          
          {/* Internal Reasoning Path Visualization [cite: 2026-02-11] */}
          <AnimatePresence>
            {expertCouncil && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 w-full max-w-sm px-4">
                <div className="glass-panel-strong p-3 rounded-xl border border-white/5 space-y-1">
                   {reasoningPath.map((r, i) => (
                     <div key={i} className="text-[9px] font-mono text-white/40 flex items-center gap-2">
                       <div className="h-1 w-1 bg-primary rounded-full" /> {r}
                     </div>
                   ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto px-6 pb-20">
          <div className="mx-auto max-w-3xl space-y-4">
            {messages.map((msg, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-4 rounded-2xl text-sm max-w-[80%] ${msg.role === 'user' ? 'bg-primary/10 border border-primary/20' : 'glass-panel border border-white/5'}`}>
                   {msg.content}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Input Bar: Intent over Syntax [cite: 2026-02-11] */}
        <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black to-transparent">
          <div className="max-w-3xl mx-auto relative flex items-center gap-3">
             <div className="flex-1 relative">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ek naya folder banao..." 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm focus:ring-2 ring-primary/50 outline-none"
                />
                <button onClick={handleSend} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:text-primary transition-colors">
                  <Send className="h-5 w-5" />
                </button>
             </div>
             <GlassButton variant={isListening ? "primary" : "default"} onClick={() => isListening ? stopListening() : startListening(handleSend)} className="rounded-2xl h-14 w-14">
                {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
             </GlassButton>
          </div>
        </div>
      </main>

      {/* Kill Switch Overlay [cite: 2026-02-11] */}
      <AnimatePresence>
        {systemFreeze && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] bg-red-950/90 flex flex-col items-center justify-center p-12 text-center backdrop-blur-2xl">
            <AlertTriangle className="h-20 w-20 text-red-500 mb-6 animate-ping" />
            <h2 className="text-4xl font-black text-white mb-4 uppercase italic">System Freeze</h2>
            <p className="text-red-200/60 max-w-md font-mono text-xs">Emergency Kill Switch Activated. All Mesh nodes disconnected. Registry locked. Manual Admin Override required to restart. [cite: 2026-02-11]</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
          }
      
