"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { VoiceConfig } from "@/lib/persona-logic";
import { SpeechRecognition, SpeechRecognitionEvent } from "web-speech-api";

export function useVoice(voiceConfig: VoiceConfig) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Select a voice that matches the desired gender
  const getVoice = useCallback((): SpeechSynthesisVoice | null => {
    if (typeof window === "undefined") return null;
    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) return null;

    const genderKeywords =
      voiceConfig.voiceGender === "female"
        ? ["female", "woman", "zira", "samantha", "google uk english female", "google hindi female"]
        : ["male", "man", "david", "google uk english male", "google hindi male"];

    // Try to find a matching voice
    let matched = voices.find((v) =>
      genderKeywords.some((k) => v.name.toLowerCase().includes(k))
    );
    if (!matched) {
      // Try Hindi voices
      matched = voices.find((v) => v.lang.startsWith("hi"));
    }
    if (!matched) {
      // Default to en voice
      matched = voices.find((v) => v.lang.startsWith("en"));
    }
    return matched || voices[0];
  }, [voiceConfig.voiceGender]);

  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined") return;
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      const voice = getVoice();
      if (voice) utterance.voice = voice;
      utterance.pitch = voiceConfig.pitch;
      utterance.rate = voiceConfig.rate;
      utterance.volume = voiceConfig.volume;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [voiceConfig, getVoice]
  );

  const stopSpeaking = useCallback(() => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const startListening = useCallback(
    (onResult: (text: string) => void) => {
      if (typeof window === "undefined") return;
      const SpeechRecognitionAPI =
        (window as unknown as { SpeechRecognition?: typeof SpeechRecognition }).SpeechRecognition ||
        (window as unknown as { webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition;
      if (!SpeechRecognitionAPI) return;

      stopSpeaking();

      const recognition = new SpeechRecognitionAPI();
      recognition.lang = "en-IN";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    },
    [stopSpeaking]
  );

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  // Preload voices
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.getVoices();
    const handleVoicesChanged = () => window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged);
    };
  }, []);

  return { isSpeaking, isListening, speak, stopSpeaking, startListening, stopListening };
}
