"use client";

import { motion, AnimatePresence } from "framer-motion";
import { WifiOff } from "lucide-react";

interface OfflineBannerProps {
  isOffline: boolean;
}

export function OfflineBanner({ isOffline }: OfflineBannerProps) {
  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-2 bg-destructive/80 backdrop-blur-md py-2.5 px-4"
        >
          <WifiOff className="h-4 w-4 text-destructive-foreground" />
          <span className="text-xs font-medium text-destructive-foreground">
            Internet nahi hai, par main yaadein (history) dikha sakta hoon.
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
