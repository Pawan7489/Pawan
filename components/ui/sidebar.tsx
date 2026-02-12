'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, ShieldCheck, Cpu, Activity, HardDrive, 
  Zap, Lock, Terminal, ShieldAlert, Wifi, Thermometer 
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Project A1: Neural Command Nexus [cite: 2026-02-11]
 * Rule: Ball-in-Ball (Onion Architecture).
 * Rule: 5-Second Self-Diagnosis (Internet, GPU, Drive).
 */

type SystemStatus = 'scanning' | 'stable' | 'alert' | 'omega'

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = React.useState<SystemStatus>('scanning')
  const [health, setHealth] = React.useState({ gpu: 42, mem: 12, net: true })

  // 1. RULE: 5-Second Self-Diagnosis Protocol [cite: 2026-02-11]
  React.useEffect(() => {
    const timer = setTimeout(() => setStatus('stable'), 5000)
    // Simulate real-time monitoring
    const interval = setInterval(() => {
      setHealth(h => ({ ...h, gpu: Math.floor(Math.random() * 10) + 40 }))
    }, 3000)
    return () => { clearTimeout(timer); clearInterval(interval); }
  }, [])

  return (
    <div className="flex min-h-svh w-full bg-[#020202] text-white font-sans selection:bg-primary/30">
      <Sidebar status={status} health={health} />
      <main className="flex-1 p-4 overflow-hidden relative">
        {/* Layer 3: Validation Layer (Onion Architecture) [cite: 2026-02-11] */}
        <div className="h-full w-full rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl p-8 overflow-auto custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  )
}

const Sidebar = ({ status, health }: { status: SystemStatus, health: any }) => {
  return (
    <aside className="w-72 flex flex-col border-r border-white/5 bg-black/40 backdrop-blur-2xl p-4 relative">
      {/* 2. RULE: Distributed Mesh HUD [cite: 2026-02-11] */}
      <div className="mb-8 px-4 py-6 rounded-3xl glass-panel-strong border border-white/10 relative overflow-hidden">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center glow-blue">
            <Brain className="h-6 w-6 text-primary animate-pulse" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-tighter uppercase">Project A1</h1>
            <p className="text-[9px] font-mono text-emerald-500 uppercase tracking-widest">Core Active</p>
          </div>
        </div>

        {/* Real-time Telemetry [cite: 2026-02-11] */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="p-2 rounded-xl bg-white/5 border border-white/5">
             <div className="flex items-center gap-1.5 text-[8px] text-white/40 uppercase font-black">
               <Thermometer className="h-2.5 w-2.5" /> GPU Temp
             </div>
             <p className={cn("text-xs font-mono mt-1", health.gpu > 75 ? "text-red-500" : "text-emerald-500")}>
               {health.gpu}°C
             </p>
          </div>
          <div className="p-2 rounded-xl bg-white/5 border border-white/5">
             <div className="flex items-center gap-1.5 text-[8px] text-white/40 uppercase font-black">
               <Wifi className="h-2.5 w-2.5" /> Mesh Net
             </div>
             <p className="text-xs font-mono mt-1 text-primary">Connected</p>
          </div>
        </div>
      </div>

      {/* 3. RULE: Guardian Protocol Sections [cite: 2026-02-11] */}
      <nav className="flex-1 space-y-1">
        <SidebarItem icon={Activity} label="Neural Streams" active />
        <SidebarItem icon={HardDrive} label="Mesh Nodes (D/E)" />
        <SidebarItem icon={ShieldCheck} label="Guardian Rules" isCritical />
        <SidebarItem icon={Terminal} label="Internal Critique" />
      </nav>

      {/* 4. RULE: Emergency Kill Switch [cite: 2026-02-11] */}
      <div className="mt-auto p-4 rounded-3xl bg-red-500/5 border border-red-500/20">
        <button className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-red-500/10 text-red-500 text-[10px] font-black uppercase hover:bg-red-500 hover:text-white transition-all">
          <ShieldAlert className="h-4 w-4" /> 
          Protocol Omega (Freeze)
        </button>
      </div>

      {/* Diagnosis Overlay [cite: 2026-02-11] */}
      <AnimatePresence>
        {status === 'scanning' && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center"
          >
            <Cpu className="h-12 w-12 text-primary animate-spin mb-4" />
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Self-Diagnosis...</h2>
            <div className="mt-4 w-full h-1 bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 5 }}
                 className="h-full bg-primary shadow-[0_0_10px_#3b82f6]" 
               />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  )
}

const SidebarItem = ({ icon: Icon, label, active = false, isCritical = false }: any) => (
  <button className={cn(
    "flex items-center gap-3 w-full px-4 py-3 rounded-2xl transition-all duration-300 group",
    active ? "bg-primary/10 text-primary shadow-[0_0_20px_rgba(59,130,246,0.1)]" : "text-white/40 hover:bg-white/5 hover:text-white"
  )}>
    <div className={cn(
      "p-2 rounded-xl transition-colors",
      active ? "bg-primary/20" : "bg-white/5 group-hover:bg-white/10"
    )}>
      <Icon className="h-4 w-4" />
    </div>
    <span className="text-[11px] font-bold uppercase tracking-tight flex-1 text-left">{label}</span>
    {isCritical && <Lock className="h-3 w-3 text-amber-500/50" />}
  </button>
)

export default SidebarProvider
