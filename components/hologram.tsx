"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export type HoloState = "idle" | "listening" | "thinking" | "happy" | "calm" | "danger";

interface HologramProps {
  state: HoloState;
  isSpeaking: boolean;
  size?: "sm" | "md" | "lg";
  whisperMode?: boolean;
}

const stateColors: Record<HoloState, { core: string; glow: string; ring: string }> = {
  idle: {
    core: "#3b82f6",
    glow: "rgba(59, 130, 246, 0.2)",
    ring: "rgba(59, 130, 246, 0.15)",
  },
  listening: {
    core: "#22c55e",
    glow: "rgba(34, 197, 94, 0.2)",
    ring: "rgba(34, 197, 94, 0.15)",
  },
  thinking: {
    core: "#e2e8f0",
    glow: "rgba(226, 232, 240, 0.15)",
    ring: "rgba(226, 232, 240, 0.1)",
  },
  happy: {
    core: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.2)",
    ring: "rgba(245, 158, 11, 0.15)",
  },
  calm: {
    core: "#a855f7",
    glow: "rgba(168, 85, 247, 0.2)",
    ring: "rgba(168, 85, 247, 0.15)",
  },
  danger: {
    core: "#ef4444",
    glow: "rgba(239, 68, 68, 0.25)",
    ring: "rgba(239, 68, 68, 0.15)",
  },
};

const sizeMap = { sm: 80, md: 140, lg: 200 };

export function Hologram({
  state,
  isSpeaking,
  size = "md",
  whisperMode = false,
}: HologramProps) {
  const colors = stateColors[state];
  const s = sizeMap[size];
  const opacity = whisperMode ? 0.5 : 1;

  const orbitParticles = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        angle: (360 / 8) * i,
        radius: s * 0.45,
        size: 2 + Math.random() * 2,
        delay: i * 0.3,
      })),
    [s]
  );

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: s, height: s, opacity }}
    >
      {/* Outer glow pulse rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute rounded-full"
          style={{
            width: s * (0.7 + i * 0.25),
            height: s * (0.7 + i * 0.25),
            border: `1px solid ${colors.ring}`,
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.05, 0.3],
          }}
          transition={{
            duration: 3 + i,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Orbiting particles */}
      {orbitParticles.map((p) => (
        <motion.div
          key={`orbit-${p.id}`}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: colors.core,
            opacity: 0.6,
          }}
          animate={{
            rotate: [p.angle, p.angle + 360],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: p.delay,
          }}
          // position it on the orbit ring
          // use a wrapper
        >
          <motion.div
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              background: colors.core,
              left: p.radius,
              opacity: 0.4,
            }}
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: p.delay,
            }}
          />
        </motion.div>
      ))}

      {/* Inner glow background */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: s * 0.6,
          height: s * 0.6,
          background: `radial-gradient(circle, ${colors.glow}, transparent 70%)`,
        }}
        animate={{
          scale: isSpeaking ? [1, 1.3, 0.95, 1.2, 1] : [1, 1.1, 1],
        }}
        transition={{
          duration: isSpeaking ? 0.5 : 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Core sphere */}
      <motion.div
        className="relative rounded-full"
        style={{
          width: s * 0.3,
          height: s * 0.3,
          background: `radial-gradient(circle at 35% 35%, ${colors.core}cc, ${colors.core}33 80%)`,
          boxShadow: `0 0 ${s * 0.3}px ${colors.glow}, 0 0 ${s * 0.6}px ${colors.glow}, inset 0 0 ${s * 0.15}px rgba(255,255,255,0.1)`,
        }}
        animate={{
          scale: isSpeaking ? [1, 1.15, 0.92, 1.1, 1] : [1, 1.05, 1],
        }}
        transition={{
          duration: isSpeaking ? 0.4 : 2.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* State label */}
      <motion.span
        className="absolute -bottom-5 text-[10px] font-mono uppercase tracking-widest"
        style={{ color: colors.core }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
      >
        {state === "idle" && "Ready"}
        {state === "listening" && "Listening"}
        {state === "thinking" && "Processing"}
        {state === "happy" && "Delighted"}
        {state === "calm" && "Soothing"}
        {state === "danger" && "Blocked"}
      </motion.span>
    </div>
  );
}
