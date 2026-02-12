'use client'

import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Activity, Zap, Cpu, Lock, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Project A1: Neural Identity Component [cite: 2026-02-11]
 * Musk Rule: High-efficiency physics for zero-lag animations.
 * Ball-in-Ball Rule: Layered security encapsulation (Onion Architecture).
 */

export type NeuralState = 'diagnosing' | 'thinking' | 'idle' | 'danger' | 'solo';

interface SuperGeniusAvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  state?: NeuralState;
  meshStatus?: 'linked' | 'searching' | 'local';
  isEncapsulated?: boolean; 
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  SuperGeniusAvatarProps
>(({ className, state = 'idle', meshStatus = 'linked', isEncapsulated = true, ...props }, ref) => {
  
  // 1. RULE: 5-Second Self-Diagnosis Visual State [cite: 2026-02-11]
  const [diagProgress, setDiagProgress] = React.useState(0);
  React.useEffect(() => {
    if (state === 'diagnosing') {
      const interval = setInterval(() => {
        setDiagProgress(prev => (prev >= 100 ? 100 : prev + 20));
      }, 1000); 
      return () => clearInterval(interval);
    }
  }, [state]);

  const stateColors = {
    idle: 'border-primary/40 shadow-primary/20',
    thinking: 'border-purple-500 shadow-purple-500/30',
    diagnosing: 'border-blue-400 shadow-blue-400/30',
    danger: 'border-red-500 shadow-red-500/50 animate-pulse',
    solo: 'border-amber-500 shadow-amber-500/30'
  };

  return (
    <div className="relative group p-1">
      {/* Layer 1: The Outer Security Ring (Ball-in-Ball Architecture) [cite: 2026-02-11] */}
      <AnimatePresence>
        {isEncapsulated && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            className={cn(
              "absolute inset-0 rounded-full border border-dashed opacity-20",
              state === 'danger' ? 'border-red-500 animate-spin-slow' : 'border-primary/50'
            )}
          />
        )}
      </AnimatePresence>

      {/* Layer 2: Self-Diagnosis Pulse Overlay [cite: 2026-02-11] */}
      <motion.div
        className={cn(
          "relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 transition-all duration-500 z-10",
          stateColors[state],
          className
        )}
      >
        <AvatarPrimitive.Root ref={ref} className="h-full w-full" {...props} />
        
        {/* Diagnosis Scan Line [cite: 2026-02-11] */}
        {state === 'diagnosing' && (
          <motion.div 
            className="absolute inset-0 bg-blue-500/20"
            initial={{ y: '100%' }}
            animate={{ y: '-100%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        )}
      </motion.div>

      {/* Layer 3: Neural Status HUD (Mesh Connection Status) [cite: 2026-02-11] */}
      <div className="absolute -top-1 -right-1 z-20">
        <AnimatePresence>
          {meshStatus === 'linked' && (
            <motion.div 
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="bg-emerald-500 rounded-full p-0.5 border border-black shadow-lg"
            >
              <ShieldCheck className="h-2.5 w-2.5 text-white" />
            </motion.div>
          )}
          {state === 'danger' && (
            <motion.div 
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="bg-red-500 rounded-full p-0.5 border border-black shadow-lg"
            >
              <Lock className="h-2.5 w-2.5 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Layer 4: Ghost Module Placeholder for future Face/Voice AI [cite: 2026-02-11] */}
      <div className="hidden" style={{ fontSize: 0 }}>def render_neural_face(): pass</div>
    </div>
  );
});
Avatar.displayName = 'NeuralAvatar';

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full grayscale-[0.2] hover:grayscale-0 transition-all duration-500', className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-primary font-mono text-[10px]',
      className
    )}
    {...props}
  >
    <Activity className="h-4 w-4 animate-pulse text-primary/50" />
  </AvatarPrimitive.Fallback>
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
              
