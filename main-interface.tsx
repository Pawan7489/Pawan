"use client";

import React from "react"

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hologram, type HoloState } from "./hologram";
import { GlassButton } from "./glass-button";
import { WorkspacePanel } from "./workspace-panel";
import { HeavyTaskModal } from "./heavy-task-modal";
import { useVoice } from "@/hooks/use-voice";
import {
  getPersonaConfig,
  getTimeContext,
  detectSentiment,
  isHeavyTask,
  type UserProfile,
} from "@/lib/persona-logic";
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  LogOut,
  Sparkles,
  Moon,
} from "lucide-react";

const springConfig = { stiffness: 260, damping: 20 };

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface MainInterfaceProps {
  profile: UserProfile;
  onLogout: () => void;
}

export function MainInterface({ profile, onLogout }: MainInterfaceProps) {
  const persona = getPersonaConfig(profile.name, profile.dob, profile.gender);
  const timeContext = getTimeContext();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [holoState, setHoloState] = useState<HoloState>("idle");
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [workspaceContent, setWorkspaceContent] = useState("");
  const [workspaceType, setWorkspaceType] = useState<"code" | "text">("text");
  const [showHeavyTask, setShowHeavyTask] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { isSpeaking, isListening, speak, stopSpeaking, startListening, stopListening } =
    useVoice(persona.voiceConfig);

  // Update holo state based on voice state
  useEffect(() => {
    if (isListening) {
      setHoloState("listening");
    } else if (isSpeaking) {
      setHoloState("thinking");
    }
  }, [isListening, isSpeaking]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Greet on mount
  useEffect(() => {
    if (hasGreeted) return;
    setHasGreeted(true);
    const greetingMsg: Message = {
      id: "greeting",
      role: "assistant",
      content: persona.greeting,
      timestamp: new Date(),
    };
    setMessages([greetingMsg]);
    if (isVoiceEnabled) {
      setTimeout(() => speak(persona.greeting), 500);
    }
  }, [hasGreeted, persona.greeting, speak, isVoiceEnabled]);

  // Generate a contextual AI response (simulated - ready for real API integration)
  const generateResponse = useCallback(
    (userMessage: string): string => {
      const sentiment = detectSentiment(userMessage);
      const lower = userMessage.toLowerCase();

      // Update holo based on sentiment
      if (sentiment === "happy") {
        setHoloState("happy");
      } else if (sentiment === "angry") {
        setHoloState("calm");
      } else {
        setHoloState("idle");
      }

      // Mode-specific responses
      if (persona.mode === "buddy") {
        if (lower.includes("sky") && lower.includes("blue")) {
          return "Ooh acha sawaal! Imagine karo ki sunlight ek magical rainbow ball hai. Jab ye atmosphere mein aati hai, blue color sabse zyada bounce karta hai har jagah - isliye sky blue dikhta hai! Cool na? Like a big blue painting!";
        }
        if (lower.includes("hello") || lower.includes("hi")) {
          return `Hellooo ${profile.name}! Maza aa gaya tujhse baat karke! Kuch interesting poochna hai?`;
        }
        return `Wow, acha question hai ${profile.name}! Chal main tujhe ek fun way mein samjhata hoon. ${userMessage} ke baare mein sochte hain jaise ek adventure story mein. Har cheez connected hai, jaise ek puzzle ke pieces!`;
      }

      if (persona.mode === "wingman") {
        if (lower.includes("code") || lower.includes("program")) {
          setWorkspaceContent(
            `// Here's a quick example for you, ${profile.name}\n\nfunction solve() {\n  // Your logic here\n  console.log("Let's build something cool!");\n  return "Done!";\n}\n\nsolve();`
          );
          setWorkspaceType("code");
          setWorkspaceOpen(true);
          return "Bro, I've thrown some starter code in the workspace panel. Check it out on the right! Modify it however you want.";
        }
        if (lower.includes("hello") || lower.includes("hi")) {
          return `Yo ${profile.name}! What's up? Ready to get stuff done today?`;
        }
        return `Alright ${profile.name}, here's the deal - ${userMessage.length > 50 ? "that's a solid question" : "quick one"}. Let me break it down for you without the fluff. The key thing to understand here is how everything connects. Want me to dig deeper?`;
      }

      if (persona.mode === "professional") {
        if (lower.includes("code") || lower.includes("program") || lower.includes("function")) {
          setWorkspaceContent(
            `/**\n * Solution for: ${userMessage}\n * Generated by A1 Professional Mode\n */\n\nexport function solution() {\n  // Implementation\n  const data = processInput();\n  return analyzeResults(data);\n}\n\nfunction processInput() {\n  return { status: 'ready' };\n}\n\nfunction analyzeResults(data: any) {\n  return { ...data, analyzed: true };\n}`
          );
          setWorkspaceType("code");
          setWorkspaceOpen(true);
          return "I've generated a structured code template in the workspace panel. You'll find it organized with clear function separation. Shall I elaborate on any specific part?";
        }
        if (lower.includes("report") || lower.includes("analyze") || lower.includes("summary")) {
          setWorkspaceContent(
            `Executive Summary\n${"=".repeat(40)}\n\nDate: ${new Date().toLocaleDateString()}\nGenerated for: ${profile.name}\n\n1. Overview\n   - Key findings based on analysis\n   - Data-driven insights\n\n2. Recommendations\n   - Action Item 1: Strategic initiative\n   - Action Item 2: Optimization opportunity\n\n3. Next Steps\n   - Timeline and milestones\n   - Resource allocation\n\n---\nGenerated by Project A1 | Professional Mode`
          );
          setWorkspaceType("text");
          setWorkspaceOpen(true);
          return "I've drafted a report template in the workspace. It follows a standard executive summary format. I can customize any section based on your specific requirements.";
        }
        return `Understood, ${profile.name}. Based on your query about "${userMessage.slice(0, 40)}${userMessage.length > 40 ? "..." : ""}", here's my analysis: The most efficient approach would be to break this into manageable components and address each systematically. Would you like me to elaborate on any specific aspect?`;
      }

      // Caretaker mode
      if (lower.includes("hello") || lower.includes("hi") || lower.includes("namaste")) {
        return `Namaste ${profile.name} Ji! Bahut accha laga aapse baat karke. Aap kaise hain? Koi bhi madad chahiye toh mujhse zaroor poochiyega.`;
      }
      return `Ji bilkul, ${profile.name} Ji. Aapne bahut accha sawaal poocha. Main isko aasaan shabdon mein samjhata hoon. "${userMessage.slice(0, 30)}..." ke baare mein - ye bilkul simple hai. Agar aur kuch jaanna hai toh zaroor poochiyega. Main hamesha aapki seva mein hoon.`;
    },
    [persona.mode, profile.name]
  );

  const handleSend = useCallback(
    (text?: string) => {
      const msgText = text || input.trim();
      if (!msgText) return;

      // Check for heavy tasks
      if (isHeavyTask(msgText)) {
        setHoloState("danger");
        setShowHeavyTask(true);
        if (isVoiceEnabled) {
          const warningMsg =
            persona.mode === "buddy"
              ? "Sorry Dost, ye kaam main nahi kar sakta!"
              : persona.mode === "caretaker"
                ? "Maaf kijiye, ye possible nahi hai."
                : "Sorry, this action is restricted for security.";
          speak(warningMsg);
        }
        setInput("");
        return;
      }

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: msgText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setHoloState("thinking");

      // Simulate AI thinking
      setTimeout(() => {
        const response = generateResponse(msgText);
        const aiMsg: Message = {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMsg]);

        if (isVoiceEnabled) {
          speak(response);
        } else {
          setTimeout(() => setHoloState("idle"), 500);
        }
      }, 800 + Math.random() * 800);
    },
    [input, generateResponse, speak, isVoiceEnabled, persona.mode]
  );

  function handleMicClick() {
    if (isListening) {
      stopListening();
    } else {
      startListening((transcript) => {
        handleSend(transcript);
      });
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div
      className={`fixed inset-0 flex flex-col bg-[#050505] ${timeContext.isWhisperMode ? "opacity-90" : ""}`}
    >
      {/* Top Bar */}
      <header className="relative z-30 flex items-center justify-between px-4 py-3 border-b border-border glass-panel">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-primary" />
          <div>
            <h1 className="text-sm font-semibold text-foreground">Project A1</h1>
            <p className="text-[10px] text-muted-foreground font-mono">
              {persona.label} | {timeContext.greeting}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {timeContext.isWhisperMode && (
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Moon className="h-3 w-3" />
              <span>Whisper</span>
            </div>
          )}
          <GlassButton
            size="sm"
            variant="ghost"
            onClick={() => {
              if (isSpeaking) stopSpeaking();
              setIsVoiceEnabled(!isVoiceEnabled);
            }}
            aria-label={isVoiceEnabled ? "Mute voice" : "Enable voice"}
          >
            {isVoiceEnabled ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </GlassButton>
          <GlassButton
            size="sm"
            variant="ghost"
            onClick={onLogout}
            aria-label="Log out"
          >
            <LogOut className="h-4 w-4" />
          </GlassButton>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Hologram Area */}
        <motion.div
          className="flex items-center justify-center py-6 md:py-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", ...springConfig, delay: 0.2 }}
        >
          <Hologram
            state={holoState}
            isSpeaking={isSpeaking}
            size="lg"
            whisperMode={timeContext.isWhisperMode}
          />
        </motion.div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 scrollbar-thin">
          <div className="mx-auto max-w-2xl flex flex-col gap-3">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 15, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", ...springConfig }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary/15 text-foreground border border-primary/20"
                        : "glass-panel text-foreground"
                    }`}
                  >
                    {msg.content}
                    <p className="mt-1.5 text-[9px] text-muted-foreground/50 font-mono">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Thinking indicator */}
            <AnimatePresence>
              {holoState === "thinking" && messages[messages.length - 1]?.role === "user" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex justify-start"
                >
                  <div className="glass-panel rounded-2xl px-4 py-3 flex items-center gap-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={`dot-${i}`}
                        className="h-1.5 w-1.5 rounded-full bg-primary"
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-border glass-panel px-4 py-3">
          <div className="mx-auto max-w-2xl flex items-center gap-3">
            {/* Mic Button */}
            <GlassButton
              variant={isListening ? "primary" : "default"}
              size="md"
              onClick={handleMicClick}
              className="shrink-0 rounded-full h-11 w-11 flex items-center justify-center p-0"
              aria-label={isListening ? "Stop listening" : "Start listening"}
            >
              <motion.div
                animate={
                  isListening
                    ? { scale: [1, 1.15, 1] }
                    : {}
                }
                transition={{
                  duration: 1,
                  repeat: isListening ? Number.POSITIVE_INFINITY : 0,
                }}
              >
                {isListening ? (
                  <MicOff className="h-5 w-5" />
                ) : (
                  <Mic className="h-5 w-5" />
                )}
              </motion.div>
            </GlassButton>

            {/* Text Input */}
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  persona.mode === "buddy"
                    ? "Kuch bhi pooch le dost..."
                    : persona.mode === "wingman"
                      ? "Type something or hit the mic..."
                      : persona.mode === "caretaker"
                        ? "Aap yahan likh sakte hain..."
                        : "Type your message..."
                }
                className="w-full rounded-xl glass-panel py-2.5 pl-4 pr-12 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 bg-transparent"
                disabled={isListening}
              />
              <GlassButton
                variant="ghost"
                size="sm"
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg h-7 w-7 flex items-center justify-center p-0"
                aria-label="Send message"
              >
                <Send className="h-3.5 w-3.5" />
              </GlassButton>
            </div>
          </div>

          {/* Listening indicator */}
          <AnimatePresence>
            {isListening && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-center text-xs text-primary mt-2 font-mono"
              >
                Listening... speak now
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Workspace Side Panel */}
      <WorkspacePanel
        content={workspaceContent}
        type={workspaceType}
        isOpen={workspaceOpen}
        onClose={() => setWorkspaceOpen(false)}
      />

      {/* Heavy Task Modal */}
      <HeavyTaskModal
        isOpen={showHeavyTask}
        onClose={() => {
          setShowHeavyTask(false);
          setHoloState("idle");
        }}
        personaLabel={persona.label}
      />
    </div>
  );
}
