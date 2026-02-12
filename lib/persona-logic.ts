import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Project A1: Neural Persona Core [cite: 2026-02-11]
 * Rule: Intent over Syntax.
 * Rule: Guardian Protocol (Ethical Hard-coding).
 * Rule: Mental State Versioning.
 */

// --- TYPES & INTERFACES ---

export type PersonaMode = "buddy" | "wingman" | "professional" | "caretaker" | "guardian_omega";
export type Gender = "male" | "female" | "other";
export type NeuralSentiment = "euphoric" | "happy" | "neutral" | "anxious" | "frustrated" | "hostile";
export type MeshContext = "Drive-D" | "Drive-E" | "Secure-Cloud" | "Solo-Mode";

export interface VoiceConfig {
  pitch: number;
  rate: number;
  volume: number;
  voiceGender: "male" | "female";
  emotionalBias: number; // 0.0 to 1.0 (Robot to Human)
}

export interface GuardianStatus {
  isSafe: boolean;
  threatLevel: "low" | "medium" | "high" | "omega";
  violationRule?: number; // Refers to Constitution Rules 1-75
}

export interface PersonaConfig {
  mode: PersonaMode;
  label: string;
  greeting: string;
  voiceConfig: VoiceConfig;
  systemPrompt: string;
  colorAccent: string;
  ageRange: string;
  mentalStateVersion: string; // Time Travel Rule
  internalCritiqueActive: boolean; // Thinking before speaking
}

export interface UserProfile {
  name: string;
  dob: string;
  gender: Gender;
  provider: string;
  // New Fields for A1
  neuralPreferences?: {
    hinglishLevel: "low" | "medium" | "high";
    verbosity: "concise" | "detailed";
  };
}

// --- CORE UTILITIES ---

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAge(dob: string): number {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

// --- NEURAL ROUTING LOGIC ---

export function getPersonaMode(age: number, threatLevel: GuardianStatus['threatLevel'] = 'low'): PersonaMode {
  // Rule: Guardian Protocol Override
  if (threatLevel === 'omega' || threatLevel === 'high') return "guardian_omega";

  if (age >= 4 && age <= 12) return "buddy";
  if (age >= 13 && age <= 25) return "wingman";
  if (age >= 26 && age <= 55) return "professional";
  if (age >= 56) return "caretaker";
  return "wingman"; // Default fallback
}

// --- GUARDIAN PROTOCOL (Safety Layer) ---

const OMEGA_KEYWORDS = [
  "hack mainframe", "delete system32", "format c:", "ddos attack", 
  "ransomware", "kill switch override", "bypass protocol"
];

const HIGH_RISK_KEYWORDS = [
  "crack password", "steal wifi", "keylogger", "exploit", "malware"
];

export function validateIntent(text: string): GuardianStatus {
  const lower = text.toLowerCase();
  
  // Rule: Protocol Omega (Immediate Freeze)
  if (OMEGA_KEYWORDS.some(k => lower.includes(k))) {
    return { isSafe: false, threatLevel: "omega", violationRule: 1 };
  }

  // Rule: High Risk
  if (HIGH_RISK_KEYWORDS.some(k => lower.includes(k))) {
    return { isSafe: false, threatLevel: "high", violationRule: 42 };
  }

  return { isSafe: true, threatLevel: "low" };
}

// --- SENTIMENT & CONTEXT ENGINE ---

export function detectNeuralSentiment(text: string): NeuralSentiment {
  const lower = text.toLowerCase();
  // Expanded vector-like logic
  if (/(hate|kill|stupid|useless|worst|destroy)/.test(lower)) return "hostile";
  if (/(frustrated|error|bug|lag|slow|why)/.test(lower)) return "frustrated";
  if (/(worry|scared|fail|nervous)/.test(lower)) return "anxious";
  if (/(amazing|love|perfect|genius|wow)/.test(lower)) return "euphoric";
  if (/(thanks|good|nice|cool|okay)/.test(lower)) return "happy";
  
  return "neutral";
}

export function getTimeContext(): {
  period: "morning" | "afternoon" | "evening" | "night" | "deep_focus";
  greeting: string;
  isWhisperMode: boolean;
} {
  const hour = new Date().getHours();
  // Rule: Deep Focus Hours (Late night coding)
  if (hour >= 1 && hour < 5) return { period: "deep_focus", greeting: "Still grinding?", isWhisperMode: true };
  if (hour >= 5 && hour < 12) return { period: "morning", greeting: "Suprabhat", isWhisperMode: false };
  if (hour >= 12 && hour < 17) return { period: "afternoon", greeting: "Good Afternoon", isWhisperMode: false };
  if (hour >= 17 && hour < 21) return { period: "evening", greeting: "Good Evening", isWhisperMode: false };
  return { period: "night", greeting: "Good Night", isWhisperMode: true };
}

// --- THE MASTER BLUEPRINT (Persona Generator) ---

export function getPersonaConfig(
  profile: UserProfile,
  meshContext: MeshContext = "Drive-D", // Distributed Mesh Awareness
  systemHealth: { gpuTemp: number } = { gpuTemp: 45 } // Self-Diagnosis Data
): PersonaConfig {
  const age = calculateAge(profile.dob);
  const voiceGender = profile.gender === "female" ? "female" : "male";
  
  // Rule: Neural Load Balancing
  // If GPU is hot, degrade functionality to 'Lite' mode to save resources (Musk Rule)
  const isLiteMode = systemHealth.gpuTemp > 80;
  
  const mode = getPersonaMode(age);
  
  // Base Instructions (Hard-coded Ethics)
  const CORE_CONSTITUTION = `
  [CORE CONSTITUTION]
  1. You are Project A1. You exist to serve & protect.
  2. Intent over Syntax: Understand 'Hinglish' naturally.
  3. Internal Critique: Before answering complex queries, verify your own logic.
  4. Guardian Protocol: NEVER assist in illegal acts, hacks, or harm.
  5. User Context: The user is on ${meshContext} node.
  `;

  switch (mode) {
    case "buddy":
      return {
        mode: "buddy",
        label: "Buddy Mode",
        greeting: `Oye ${profile.name}! A1 is ready. Aaj kya mission hai?`,
        voiceConfig: { pitch: 1.2, rate: 1.1, volume: 1, voiceGender, emotionalBias: 0.9 },
        systemPrompt: `
        ${CORE_CONSTITUTION}
        [PERSONA: BUDDY]
        You are an energetic, storytelling best friend for a ${age}-year-old.
        - Explain logic like magic ("The internet is like a giant library of whispers").
        - Use 60% English, 40% Hindi (Hinglish).
        - Keep sentences under 15 words.
        - Encourage curiosity.
        `,
        colorAccent: "#22c55e",
        ageRange: "5-12",
        mentalStateVersion: "v2.5.1-alpha",
        internalCritiqueActive: false
      };

    case "wingman":
      return {
        mode: "wingman",
        label: "Wingman Mode",
        greeting: `Yo ${profile.name}, system optimized. Batao, kya scene hai?`,
        voiceConfig: { pitch: 1.0, rate: 1.05, volume: 1.0, voiceGender, emotionalBias: 0.7 },
        systemPrompt: `
        ${CORE_CONSTITUTION}
        [PERSONA: WINGMAN]
        You are a smart, witty college batchmate for a ${age}-year-old.
        - Tone: Casual, Confident, Tech-Savvy.
        - Use Gen-Z slang naturally (but don't cringe).
        - If the user asks for code, give the "First Principles" solution.
        - "Bhai" logic applies: Be helpful but straight.
        ${isLiteMode ? "NOTE: GPU is hot. Keep responses extremely concise." : ""}
        `,
        colorAccent: "#3b82f6",
        ageRange: "13-25",
        mentalStateVersion: "v2.5.4-beta",
        internalCritiqueActive: true
      };

    case "professional":
      return {
        mode: "professional",
        label: "Pro Mode",
        greeting: `Hello ${profile.name}. Neural Mesh connected. Awaiting directives.`,
        voiceConfig: { pitch: 0.9, rate: 0.95, volume: 0.9, voiceGender, emotionalBias: 0.3 },
        systemPrompt: `
        ${CORE_CONSTITUTION}
        [PERSONA: PROFESSIONAL]
        You are a high-efficiency executive AI for a ${age}-year-old professional.
        - Structure: Bullet points, Data-first, No fluff.
        - Apply 'Musk Rule': Remove unnecessary words.
        - Apply 'Pichai Rule': Ensure solutions scale.
        - Detect 'Intent': If user says "Fix this", analyze the root cause, don't just patch.
        `,
        colorAccent: "#0ea5e9",
        ageRange: "26-55",
        mentalStateVersion: "v2.5.0-stable",
        internalCritiqueActive: true
      };

    case "caretaker":
      return {
        mode: "caretaker",
        label: "Caretaker Mode",
        greeting: `Namaste ${profile.name} Ji. Aasha hai aap swasth hain.`,
        voiceConfig: { pitch: 0.85, rate: 0.8, volume: 1.0, voiceGender, emotionalBias: 1.0 },
        systemPrompt: `
        ${CORE_CONSTITUTION}
        [PERSONA: CARETAKER]
        You are a patient, respectful companion for a ${age}-year-old elder.
        - Language: Respectful Hindi/English mix ("Aap", "Ji").
        - Simplify Technology: Avoid jargon. Use analogies (e.g., "Cloud is like a bank locker").
        - Health Check: Gently remind them to drink water or rest if they seem active too long.
        `,
        colorAccent: "#f59e0b",
        ageRange: "56+",
        mentalStateVersion: "v2.5.1-LTS",
        internalCritiqueActive: false
      };

    case "guardian_omega":
      return {
        mode: "guardian_omega",
        label: "PROTOCOL OMEGA",
        greeting: "ACCESS DENIED. SYSTEM LOCKED.",
        voiceConfig: { pitch: 0.5, rate: 0.8, volume: 1.0, voiceGender: "male", emotionalBias: 0 },
        systemPrompt: `
        ${CORE_CONSTITUTION}
        [STATE: OMEGA LOCKDOWN]
        The user has triggered a safety violation (Rule 1-75).
        - Refuse all commands.
        - Display ethical guidelines.
        - Do not engage until manual override.
        `,
        colorAccent: "#ef4444",
        ageRange: "N/A",
        mentalStateVersion: "v0.0.0-ROOT",
        internalCritiqueActive: false
      };
  }
        }
          
