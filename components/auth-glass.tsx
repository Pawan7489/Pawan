"use client";

import React from "react"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassButton } from "./glass-button";
import type { Gender, UserProfile } from "@/lib/persona-logic";
import {
  Lock,
  Github,
  Smartphone,
  Send,
  Calendar,
  User,
  ChevronRight,
  Sparkles,
  Globe,
} from "lucide-react";

const springConfig = { stiffness: 260, damping: 20 };

interface AuthGlassProps {
  onLogin: (profile: UserProfile) => void;
}

type AuthStep = "provider" | "profile";

export function AuthGlass({ onLogin }: AuthGlassProps) {
  const [step, setStep] = useState<AuthStep>("provider");
  const [provider, setProvider] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [isLoading, setIsLoading] = useState(false);

  function handleProviderSelect(p: string) {
    setProvider(p);
    setStep("profile");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !dob) return;
    setIsLoading(true);
    setTimeout(() => {
      onLogin({ name: name.trim(), dob, gender, provider });
    }, 800);
  }

  const providers = [
    { id: "google", label: "Google", icon: Globe },
    { id: "github", label: "GitHub", icon: Github },
    { id: "telegram", label: "Telegram", icon: Send },
    { id: "mobile", label: "Mobile OTP", icon: Smartphone },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#050505] p-4">
      {/* Background ambient particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: 2 + Math.random() * 3,
              height: 2 + Math.random() * 3,
              background: "rgba(59, 130, 246, 0.3)",
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", ...springConfig }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-panel-strong rounded-2xl p-8">
          {/* Header */}
          <motion.div
            className="mb-8 flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 glow-blue">
              <Sparkles className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Project A1
            </h1>
            <p className="text-sm text-muted-foreground text-center">
              Your Digital Companion with Emotional Intelligence
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {step === "provider" ? (
              <motion.div
                key="provider-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ type: "spring", ...springConfig }}
              >
                <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Continue with
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {providers.map((p) => (
                    <GlassButton
                      key={p.id}
                      onClick={() => handleProviderSelect(p.id)}
                      className="flex items-center justify-center gap-2 py-3"
                    >
                      <p.icon className="h-4 w-4" />
                      <span>{p.label}</span>
                    </GlassButton>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="profile-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: "spring", ...springConfig }}
                onSubmit={handleSubmit}
              >
                <button
                  type="button"
                  onClick={() => setStep("provider")}
                  className="mb-4 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronRight className="h-3 w-3 rotate-180" />
                  Back
                </button>

                <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Complete your profile
                </p>

                <div className="flex flex-col gap-4">
                  {/* Name */}
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg glass-panel py-2.5 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 bg-transparent"
                      required
                      autoFocus
                    />
                  </div>

                  {/* Date of Birth */}
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full rounded-lg glass-panel py-2.5 pl-10 pr-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 bg-transparent [color-scheme:dark]"
                      required
                      max={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <p className="mb-2 text-xs text-muted-foreground">Gender</p>
                    <div className="flex gap-2">
                      {(["male", "female", "other"] as Gender[]).map((g) => (
                        <GlassButton
                          key={g}
                          type="button"
                          variant={gender === g ? "primary" : "default"}
                          size="sm"
                          onClick={() => setGender(g)}
                          className="flex-1 capitalize"
                        >
                          {g}
                        </GlassButton>
                      ))}
                    </div>
                  </div>

                  {/* Submit */}
                  <GlassButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="mt-2 w-full flex items-center justify-center gap-2"
                    disabled={isLoading || !name.trim() || !dob}
                  >
                    {isLoading ? (
                      <motion.div
                        className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 0.8,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      />
                    ) : (
                      <>
                        Enter A1
                        <ChevronRight className="h-4 w-4" />
                      </>
                    )}
                  </GlassButton>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Trust Badge */}
          <motion.div
            className="mt-8 flex items-center justify-center gap-2 text-[11px] text-muted-foreground/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Lock className="h-3 w-3" />
            <span>Secure Encrypted</span>
            <span className="text-muted-foreground/30">|</span>
            <span>Made in India</span>
            <span className="text-muted-foreground/30">|</span>
            <span>Project A1</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
