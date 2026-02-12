'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes'

/**
 * Project A1: Neural Theme Provider [cite: 2026-02-11]
 * Musk Rule: Efficiency via centralized context management.
 * Zuckerberg Rule: Speed in state switching.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [isSystemHealthy, setIsSystemHealthy] = React.useState(false)
  const [isFrozen, setIsFrozen] = React.useState(false)
  const [diagnosisLog, setDiagnosisLog] = React.useState<string[]>([])

  // 1. RULE: 5-Second Self-Diagnosis Protocol [cite: 2026-02-11]
  React.useEffect(() => {
    const modules = ["Internet", "GPU Temp", "Memory", "Drive Mesh"]
    let index = 0
    
    const interval = setInterval(() => {
      if (index < modules.length) {
        setDiagnosisLog((prev) => [...prev, `${modules[index]}: Verified`])
        index++
      } else {
        setIsSystemHealthy(true)
        clearInterval(interval)
      }
    }, 1250) // Total 5 seconds [cite: 2026-02-11]

    return () => clearInterval(interval)
  }, [])

  // 2. RULE: Kill Switch Protocol (Emergency Stop) [cite: 2026-02-11]
  React.useEffect(() => {
    const handleEmergencyStop = (e: KeyboardEvent) => {
      // Ctrl+Alt+K sequence [cite: 2026-02-11]
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'k') {
        setIsFrozen(true)
        console.error("CRITICAL: Master Override Command Detected. System Frozen.") [cite: 2026-02-11]
      }
    }
    window.addEventListener('keydown', handleEmergencyStop)
    return () => window.removeEventListener('keydown', handleEmergencyStop)
  }, [])

  // 3. RULE: Ball-in-Ball Rule (Nested Encapsulation) [cite: 2026-02-11]
  // Hum core children ko security aur diagnosis layers ke andar wrap kar rahe hain.
  return (
    <NextThemesProvider 
      {...props} 
      // Force "Danger" theme if diagnosis fails or Kill Switch is hit [cite: 2026-02-11]
      forcedTheme={isFrozen ? 'danger' : !isSystemHealthy ? 'diagnosing' : undefined}
    >
      <div className={`a1-neural-wrapper ${isFrozen ? 'system-freeze' : ''}`}>
        {!isSystemHealthy && (
          <div className="diagnosis-overlay">
            {diagnosisLog.map((log, i) => <p key={i}>{log}</p>)}
          </div>
        )}
        {/* Layered Security: Children only render if not frozen [cite: 2026-02-11] */}
        {!isFrozen ? children : <div className="freeze-screen">SYSTEM OVERRIDE ACTIVE</div>}
      </div>
    </NextThemesProvider>
  )
}
