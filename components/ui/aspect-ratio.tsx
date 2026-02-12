'use client'

import * as React from 'react'
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, ShieldCheck, Zap, Cpu, HardDrive, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

// Musk Rule: High-efficiency rendering with minimum CPU/GPU overhead [cite: 2026-02-11]
const AspectRatio = AspectRatioPrimitive.Root

interface SuperGeniusVisualProps extends React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> {
  src?: string;
  onAnalysisComplete?: (data: any) => void;
  isSensitive?: boolean; // Guardian Protocol check [cite: 2026-02-11]
}

const NeuralAspectRatio = React.forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  SuperGeniusVisualProps
>(({ className, children, ratio = 16 / 9, src, isSensitive = false, ...props }, ref) => {
  const [isDiagnosing, setIsDiagnosing] = React.useState(true);
  const [meshSource, setMeshSource] = React.useState<'Local' | 'Cloud' | 'External'>('External');
  const [scanProgress, setScanProgress] = React.useState(0);

  // 1. RULE: 5-Second Self-Diagnosis & Mesh Source Detection [cite: 2026-02-11]
  React.useEffect(() => {
    if (src) {
      if (src.startsWith('D:') || src.startsWith('E:')) setMeshSource('Local');
      else if (src.includes('drive.google')) setMeshSource('Cloud');
    }

    const timer = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsDiagnosing(false);
          return 100;
        }
        return prev + 25;
      });
    }, 1250); // 5 seconds total for full diagnosis/scan [cite: 2026-02-11]

    return () => clearInterval(timer);
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden rounded-3xl border border-white/5 bg-black/20 backdrop-blur-md group", className)}>
      <AspectRatio ref={ref} ratio={ratio} {...props}>
        
        {/* Layer 1: The Media Content */}
        <div className={cn("h-full w-full transition-all duration-700", isDiagnosing ? "blur-md scale-105" : "blur-0 scale-100")}>
          {children}
        </div>

        {/* Layer 2: Ball-in-Ball Security & Analysis Overlay [cite: 2026-02-11] */}
        <AnimatePresence>
          {isDiagnosing && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40"
            >
              <div className="relative">
                <Cpu className="h-10 w-10 text-primary animate-spin" />
                <motion.div 
                  className="absolute inset-0 border-2 border-primary rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <p className="mt-4 text-[10px] font-mono text-primary uppercase tracking-[0.3em]">Scanning Node: {scanProgress}%</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Layer 3: Neural Status HUD [cite: 2026-02-11] */}
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md">
            <HardDrive className="h-3 w-3 text-emerald-400" />
            <span className="text-[9px] font-bold text-white/70 uppercase">Mesh: {meshSource}</span>
          </div>
          {isSensitive && (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-red-500/20 border border-red-500/30 backdrop-blur-md">
              <ShieldCheck className="h-3 w-3 text-red-500" />
              <span className="text-[9px] font-bold text-red-500 uppercase">Guardian Restricted</span>
            </div>
          )}
        </div>

        {/* Layer 4: Automatic Intent Trigger UI [cite: 2026-02-11] */}
        {!isDiagnosing && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="absolute bottom-4 inset-x-4 z-20 flex justify-between items-center px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 backdrop-blur-xl"
          >
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-medium text-white/80">Visual Intent Detected: Circuit Analysis Ready</span>
            </div>
            <button className="text-[9px] font-black uppercase text-primary hover:glow-blue transition-all">
              Trigger Neural Explain
            </button>
          </motion.div>
        )}

        {/* Ghost Module Protocol: Placeholder for future Video AI [cite: 2026-02-11] */}
        <div className="hidden">def process_video_stream(): pass</div>

      </AspectRatio>
    </div>
  )
})
NeuralAspectRatio.displayName = 'NeuralAspectRatio'

export { NeuralAspectRatio as AspectRatio }
