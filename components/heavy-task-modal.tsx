"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Download, X } from "lucide-react";
import { GlassButton } from "./glass-button";

const springConfig = { stiffness: 260, damping: 20 };

interface HeavyTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  personaLabel: string;
}

export function HeavyTaskModal({
  isOpen,
  onClose,
  personaLabel,
}: HeavyTaskModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", ...springConfig }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2"
          >
            <div className="glass-panel-strong rounded-2xl p-6 glow-red">
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/15">
                  <ShieldAlert className="h-5 w-5 text-destructive" />
                </div>
                <GlassButton size="sm" onClick={onClose}>
                  <X className="h-3.5 w-3.5" />
                </GlassButton>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                Action Restricted
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {personaLabel === "Buddy Mode"
                  ? "Sorry Dost, main web se ye nahi kar sakta. Ye kaam sirf app se hota hai!"
                  : personaLabel === "Caretaker Mode"
                    ? "Maaf kijiye, ye kaam web browser mein possible nahi hai. App download karna padega."
                    : "Sorry, this action requires system-level access that is not available in the browser. Please download the native app."}
              </p>

              <div className="flex gap-3">
                <GlassButton
                  variant="primary"
                  size="md"
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={onClose}
                >
                  <Download className="h-4 w-4" />
                  Download App
                </GlassButton>
                <GlassButton size="md" onClick={onClose}>
                  Cancel
                </GlassButton>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
