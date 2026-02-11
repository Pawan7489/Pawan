"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AuthGlass } from "@/components/auth-glass";
import { MainInterface } from "@/components/main-interface";
import { OfflineBanner } from "@/components/offline-banner";
import { useOnlineStatus } from "@/hooks/use-online-status";
import type { UserProfile } from "@/lib/persona-logic";

export default function Page() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isOnline = useOnlineStatus();

  // Check for existing session
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("a1-profile");
      if (saved) {
        setProfile(JSON.parse(saved));
      }
    } catch {
      // Ignore parse errors
    }
    setIsLoaded(true);
  }, []);

  function handleLogin(p: UserProfile) {
    setProfile(p);
    try {
      sessionStorage.setItem("a1-profile", JSON.stringify(p));
    } catch {
      // Ignore storage errors
    }
  }

  function handleLogout() {
    setProfile(null);
    try {
      sessionStorage.removeItem("a1-profile");
    } catch {
      // Ignore storage errors
    }
  }

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#050505]">
        <motion.div
          className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <>
      <OfflineBanner isOffline={!isOnline} />

      <AnimatePresence mode="wait">
        {profile ? (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={!isOnline ? "grayscale" : ""}
          >
            <MainInterface profile={profile} onLogout={handleLogout} />
          </motion.div>
        ) : (
          <motion.div
            key="auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AuthGlass onLogin={handleLogin} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
