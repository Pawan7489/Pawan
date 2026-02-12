"use client";

import { useCallback, useState, useRef } from "react";

// Project A1: Voice Persona Definitions
const VOICE_MODELS = {
  CHILD: { pitch: 1.6, rate: 1.1, volume: 1.0, emotion: "playful" },
  ADULT_MALE: { pitch: 1.0, rate: 1.0, volume: 1.0, emotion: "professional" },
  ADULT_FEMALE: { pitch: 1.1, rate: 1.0, volume: 1.0, emotion: "empathetic" },
  SENIOR: { pitch: 0.85, rate: 0.85, volume: 0.9, emotion: "wise" }
};

export function useSystemVoice() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = useCallback((text: string, age: number, gender: string) => {
    if (typeof window === "undefined") return;

    // 1. Human Logic: Age aur Gender ke hisab se Model chunna
    let config = VOICE_MODELS.ADULT_MALE;
    if (age < 13) config = VOICE_MODELS.CHILD;
    else if (age > 60) config = VOICE_MODELS.SENIOR;
    else if (gender === "female") config = VOICE_MODELS.ADULT_FEMALE;

    const utterance = new SpeechSynthesisUtterance(text);
    
    // 2. Local Voice Installation Check
    // System mein installed High-Quality voices ko dhoondhna
    const voices = window.speechSynthesis.getVoices();
    const systemVoice = voices.find(v => 
      v.localService === true && // Sirf system-installed voices use karein
      (gender === "female" ? v.name.includes("Female") : v.name.includes("Male"))
    );

    utterance.voice = systemVoice || voices[0];
    utterance.pitch = config.pitch;
    utterance.rate = config.rate;
    utterance.volume = config.volume;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  return { speak, isSpeaking };
}
