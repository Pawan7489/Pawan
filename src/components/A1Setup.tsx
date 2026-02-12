"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateAge, getPersonaConfig, Gender } from '@/lib/ai-logic';
import { Calendar, User, Cpu, Sparkles, BrainCircuit } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function A1Setup() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [config, setConfig] = useState<any>(null);

  // Real-time Brain Update
  useEffect(() => {
    if (dob && name) {
      const age = calculateAge(dob);
      const aiData = getPersonaConfig(name, age, gender);
      setConfig(aiData);
    }
  }, [name, dob, gender]);

  return (
    <div className="min-h-screen live-bg flex items-center justify-center p-4">
      
      {/* Main Glass Card */}
      <Card className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 glass-panel rounded-3xl overflow-hidden shadow-2xl transition-all duration-700"
            style={{ borderColor: config?.color || '#3b82f6' }}>
        
        {/* LEFT: User Input */}
        <div className="p-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              A1 Super Genius
            </h1>
            <p className="text-slate-400">Initialize your neural link.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-slate-500">Identity</label>
              <Input 
                placeholder="Enter your name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-900/50 border-slate-700 mt-2 h-12 text-lg"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-slate-500">Birth Cycle</label>
              <Input 
                type="date" 
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="bg-slate-900/50 border-slate-700 mt-2 h-12"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-slate-500">Voice & Logic Model</label>
              <div className="flex gap-4 mt-2">
                <button 
                  onClick={() => setGender("male")}
                  className={`flex-1 p-4 rounded-xl border flex items-center justify-center gap-2 transition-all
                    ${gender === 'male' ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'border-slate-800 text-slate-500'}`}
                >
                  <User size={20} /> Male Logic
                </button>
                <button 
                  onClick={() => setGender("female")}
                  className={`flex-1 p-4 rounded-xl border flex items-center justify-center gap-2 transition-all
                    ${gender === 'female' ? 'bg-pink-600/20 border-pink-500 text-pink-400' : 'border-slate-800 text-slate-500'}`}
                >
                  <Sparkles size={20} /> Female Logic
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Live AI Preview */}
        <div className="relative p-8 flex flex-col items-center justify-center text-center overflow-hidden">
          
          {/* Animated Background Pulse */}
          <div className="absolute inset-0 z-0 opacity-20"
               style={{ 
                 background: config ? `radial-gradient(circle at center, ${config.color} 0%, transparent 70%)` : 'none' 
               }} 
          />

          {config ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="z-10 space-y-6"
            >
              {/* The "Brain" Visual */}
              <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: config.color }}></div>
                <div className="relative z-10 bg-slate-950 p-6 rounded-full border-2 shadow-[0_0_30px_rgba(0,0,0,0.5)]" 
                     style={{ borderColor: config.color }}>
                  <BrainCircuit size={64} style={{ color: config.color }} />
                </div>
              </div>

              {/* Status Text */}
              <div>
                <h2 className="text-2xl font-bold" style={{ color: config.color }}>
                  {config.mode.toUpperCase()} MODE
                </h2>
                <p className="text-sm text-slate-400 mt-1 uppercase tracking-widest">
                  Logic: {gender === 'male' ? 'Transactional' : 'Relational'}
                </p>
              </div>

              {/* Logic Preview Box */}
              <div className="bg-slate-900/80 p-4 rounded-lg border border-white/10 text-left max-w-sm mx-auto backdrop-blur-md">
                <p className="text-xs text-slate-500 mb-2">THINKING PROCESS:</p>
                <p className="text-slate-300 italic text-sm">
                  "{config.nuance.logic}"
                </p>
                <div className="mt-3 flex gap-2 flex-wrap">
                  {config.nuance.slang.map((word: string) => (
                    <span key={word} className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10 text-slate-400">
                      {word}
                    </span>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-white text-black hover:bg-slate-200 mt-4 h-12 font-bold"
                      style={{ boxShadow: `0 0 20px ${config.color}40` }}>
                ACTIVATE NEURAL LINK
              </Button>

            </motion.div>
          ) : (
            <div className="z-10 text-slate-600 flex flex-col items-center">
              <Cpu size={48} className="mb-4 animate-pulse" />
              <p>Waiting for bio-data...</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
              }
              
