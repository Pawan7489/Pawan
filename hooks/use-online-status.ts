"use client";

import { useState, useEffect } from "react";

// --- TYPES & INTERFACES ---
// Ye experimental API hai, isliye hum isse manually define kar rahe hain
interface NetworkInformation extends EventTarget {
  readonly effectiveType: "slow-2g" | "2g" | "3g" | "4g";
  readonly rtt: number;      // Round Trip Time (Ping) in ms
  readonly downlink: number; // Download speed in Mbps
  readonly saveData: boolean;
  onchange: EventListener | null;
}

export type BrainMode = "CLOUD_QUANTUM" | "HYBRID" | "LOCAL_CORE";

export interface NetworkHealth {
  isOnline: boolean;
  quality: "Excellent" | "Good" | "Poor" | "Dead";
  speedMbps: number; // e.g., 10 Mbps
  latencyMs: number; // e.g., 50 ms
  activeBrain: BrainMode; // AI decide karega kaunsa dimaag use karna hai
  message: string;
}

export function useNetworkIntelligence(): NetworkHealth {
  // 1. Initial State (Optimistic)
  const [status, setStatus] = useState<NetworkHealth>({
    isOnline: true,
    quality: "Good",
    speedMbps: 10,
    latencyMs: 50,
    activeBrain: "CLOUD_QUANTUM", // Default: Full Power
    message: "Initializing Network Neural Link...",
  });

  useEffect(() => {
    // 2. The Logic Engine (AI Decision Maker)
    const analyzeNetwork = () => {
      // Browser Connection API (Chrome/Edge/Android)
      // @ts-ignore
      const connection = navigator.connection as NetworkInformation;
      const isOnline = navigator.onLine;

      if (!isOnline) {
        setStatus({
          isOnline: false,
          quality: "Dead",
          speedMbps: 0,
          latencyMs: 9999,
          activeBrain: "LOCAL_CORE", // EMERGENCY MODE
          message: "🔴 OFFLINE. Switched to Local Llama 3 (Drive D).",
        });
        return;
      }

      // Agar API available nahi hai (Firefox/Safari), to basic online maano
      if (!connection) {
        setStatus((prev) => ({ ...prev, isOnline: true, message: "Standard Link Active" }));
        return;
      }

      const { downlink, rtt, effectiveType } = connection;

      // --- BRAIN SWITCHING LOGIC (The Genius Part) ---
      let newMode: BrainMode = "CLOUD_QUANTUM";
      let quality: NetworkHealth["quality"] = "Good";
      let msg = "🟢 Connection Stable. Using Cloud Matrix.";

      // Condition 1: High Latency or Slow Net -> Hybrid Mode
      if (rtt > 300 || downlink < 1.5 || effectiveType === '2g') {
        newMode = "HYBRID"; // Images Local, Text Cloud
        quality = "Poor";
        msg = "🟡 Network Weak. Compressed Data Mode Active.";
      } 
      // Condition 2: Very Slow -> Local Only
      else if (effectiveType === 'slow-2g') {
        newMode = "LOCAL_CORE";
        quality = "Dead";
        msg = "🟠 Critical Lag. Running purely on Local GPU.";
      }
      // Condition 3: Fast Net -> Cloud Mode
      else {
        newMode = "CLOUD_QUANTUM";
        quality = "Excellent";
      }

      setStatus({
        isOnline: true,
        quality,
        speedMbps: downlink,
        latencyMs: rtt,
        activeBrain: newMode,
        message: msg,
      });
    };

    // 3. Event Listeners
    window.addEventListener("online", analyzeNetwork);
    window.addEventListener("offline", analyzeNetwork);
    
    // @ts-ignore
    if (navigator.connection) {
      // @ts-ignore
      navigator.connection.addEventListener("change", analyzeNetwork);
    }

    // Initial Check
    analyzeNetwork();

    return () => {
      window.removeEventListener("online", analyzeNetwork);
      window.removeEventListener("offline", analyzeNetwork);
      // @ts-ignore
      if (navigator.connection) {
        // @ts-ignore
        navigator.connection.removeEventListener("change", analyzeNetwork);
      }
    };
  }, []);

  return status;
}
