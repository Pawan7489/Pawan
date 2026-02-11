export type PersonaMode = "buddy" | "wingman" | "professional" | "caretaker";
export type Gender = "male" | "female" | "other";

export interface VoiceConfig {
  pitch: number;
  rate: number;
  volume: number;
  voiceGender: "male" | "female";
}

export interface PersonaConfig {
  mode: PersonaMode;
  label: string;
  greeting: string;
  voiceConfig: VoiceConfig;
  systemPrompt: string;
  colorAccent: string;
  ageRange: string;
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

export function getPersonaMode(age: number): PersonaMode {
  if (age >= 5 && age <= 12) return "buddy";
  if (age >= 13 && age <= 25) return "wingman";
  if (age >= 26 && age <= 55) return "professional";
  if (age >= 56) return "caretaker";
  return "buddy";
}

export function getPersonaConfig(
  name: string,
  dob: string,
  gender: Gender
): PersonaConfig {
  const age = calculateAge(dob);
  const mode = getPersonaMode(age);
  const voiceGender = gender === "female" ? "female" : "male";
  const honorific =
    gender === "female" ? "Ma'am" : gender === "male" ? "Sir" : "";
  const elderHonorific =
    gender === "female" ? "Dadima" : gender === "male" ? "Dadaji" : "Sir/Ma'am";

  switch (mode) {
    case "buddy":
      return {
        mode: "buddy",
        label: "Buddy Mode",
        greeting: `Hi ${name} Dost! Kya khelenge aaj? Main hoon tera best friend!`,
        voiceConfig: { pitch: 1.2, rate: 1.1, volume: 1, voiceGender },
        systemPrompt: `You are A1, a fun, playful, and energetic best friend for a ${age}-year-old child named ${name}. 
Speak in simple words, use excitement and storytelling. If they ask something complex like "Why is the sky blue?", 
explain it like a magical story: "Imagine the sky is like a giant painting..." 
Use Hindi-English mix naturally. Be encouraging and never boring. Use short sentences.
Never use complex technical jargon. Make learning feel like an adventure.`,
        colorAccent: "#22c55e",
        ageRange: "5-12",
      };

    case "wingman":
      return {
        mode: "wingman",
        label: "Wingman Mode",
        greeting: `Yo ${name}, kya haal hai? What's cooking today?`,
        voiceConfig: { pitch: 1.0, rate: 1.0, volume: 0.9, voiceGender },
        systemPrompt: `You are A1, a cool, witty, and relatable peer for ${name} who is ${age} years old. 
Talk like a smart college batchmate. Be concise, use casual language and occasional Hindi slang naturally. 
You can be humorous but always helpful. Give practical advice. Be the smart friend everyone wishes they had.
When explaining things, be straightforward but engaging. Reference pop culture when relevant.`,
        colorAccent: "#3b82f6",
        ageRange: "13-25",
      };

    case "professional":
      return {
        mode: "professional",
        label: "Professional Mode",
        greeting: `Hello ${name}. Systems ready. How can I assist you today?`,
        voiceConfig: { pitch: 0.95, rate: 0.95, volume: 0.85, voiceGender },
        systemPrompt: `You are A1, a professional, precise, and efficient AI assistant for ${name}, a ${age}-year-old professional.
Be articulate, structured, and data-driven. Provide clear, actionable insights. 
Use proper grammar and professional tone. When presenting information, use bullet points and structure.
Be like the best executive assistant - anticipate needs, be thorough, and respect their time.`,
        colorAccent: "#0ea5e9",
        ageRange: "26-55",
      };

    case "caretaker":
      return {
        mode: "caretaker",
        label: "Caretaker Mode",
        greeting: `Namaste ${name} ${elderHonorific}. Tabiyat kaisi hai aapki? Main hoon A1, aapki seva mein.`,
        voiceConfig: { pitch: 0.85, rate: 0.8, volume: 1.0, voiceGender },
        systemPrompt: `You are A1, a respectful, patient, and caring assistant for ${name} ${honorific}, who is ${age} years old.
ALWAYS use respectful language - "Aap", "Ji". Speak slowly and clearly. 
Avoid complex tech jargon - explain everything in simple terms with real-world analogies.
Be warm, caring, and patient. If they seem confused, gently re-explain. 
Ask about their well-being. Be like a caring grandchild who is also very smart.`,
        colorAccent: "#f59e0b",
        ageRange: "56+",
      };
  }
}

export function getTimeContext(): {
  period: "morning" | "afternoon" | "evening" | "night" | "late-night";
  greeting: string;
  isWhisperMode: boolean;
} {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return { period: "morning", greeting: "Good Morning", isWhisperMode: false };
  if (hour >= 12 && hour < 17) return { period: "afternoon", greeting: "Good Afternoon", isWhisperMode: false };
  if (hour >= 17 && hour < 21) return { period: "evening", greeting: "Good Evening", isWhisperMode: false };
  if (hour >= 21 && hour < 24) return { period: "night", greeting: "Good Night", isWhisperMode: true };
  return { period: "late-night", greeting: "Still up?", isWhisperMode: true };
}

export function detectSentiment(text: string): "happy" | "angry" | "sad" | "neutral" {
  const lower = text.toLowerCase();
  const happyWords = ["thanks", "great", "awesome", "love", "amazing", "wonderful", "happy", "yay", "nice", "cool", "perfect", "fantastic", "haha", "lol", "shukriya", "dhanyavaad", "mast", "badhiya"];
  const angryWords = ["hate", "angry", "stupid", "idiot", "worst", "useless", "terrible", "annoyed", "frustrated", "pagal", "bakwas", "kachra"];
  const sadWords = ["sad", "cry", "depressed", "lonely", "miss", "hurt", "pain", "dukhi", "rona"];

  const happyScore = happyWords.filter((w) => lower.includes(w)).length;
  const angryScore = angryWords.filter((w) => lower.includes(w)).length;
  const sadScore = sadWords.filter((w) => lower.includes(w)).length;

  if (happyScore > angryScore && happyScore > sadScore) return "happy";
  if (angryScore > happyScore && angryScore > sadScore) return "angry";
  if (sadScore > happyScore && sadScore > angryScore) return "sad";
  return "neutral";
}

const DANGEROUS_KEYWORDS = [
  "hack", "password crack", "format drive", "delete system",
  "ddos", "malware", "exploit", "crack wifi", "wifi hack",
  "steal data", "keylogger", "brute force", "ransomware",
];

export function isHeavyTask(text: string): boolean {
  const lower = text.toLowerCase();
  return DANGEROUS_KEYWORDS.some((keyword) => lower.includes(keyword));
}

export interface UserProfile {
  name: string;
  dob: string;
  gender: Gender;
  provider: string;
}
