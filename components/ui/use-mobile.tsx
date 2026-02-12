'use client'

import * as React from 'react'

/**
 * Project A1: Neural Environment Detector [cite: 2026-02-11]
 * Rules: Musk Rule (Efficiency), 5-Second Self-Diagnosis.
 */

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

interface NeuralEnvironment {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isTouch: boolean
  isDiagnosing: boolean // 5-Second Self-Diagnosis Hook [cite: 2026-02-11]
  orientation: 'portrait' | 'landscape'
  meshNode: 'Local-Core' | 'Remote-Bridge'
}

export function useNeuralEnvironment() {
  const [env, setEnv] = React.useState<NeuralEnvironment>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouch: false,
    isDiagnosing: true,
    orientation: 'landscape',
    meshNode: 'Local-Core',
  })

  React.useEffect(() => {
    // 1. RULE: 5-Second Self-Diagnosis Visual Hook [cite: 2026-02-11]
    const diagnosisTimer = setTimeout(() => {
      setEnv((prev) => ({ ...prev, isDiagnosing: false }))
    }, 5000)

    const updateEnvironment = () => {
      const width = window.innerWidth
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      
      // Distributed Mesh Logic: Detect if running on a heavy machine or thin client
      const meshNode = width < MOBILE_BREAKPOINT ? 'Remote-Bridge' : 'Local-Core'

      setEnv((prev) => ({
        ...prev,
        isMobile: width < MOBILE_BREAKPOINT,
        isTablet: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
        isDesktop: width >= TABLET_BREAKPOINT,
        isTouch: isTouch,
        orientation: window.innerHeight > window.innerWidth ? 'portrait' : 'landscape',
        meshNode: meshNode,
      }))
    }

    // High-Efficiency Listener (Zuckerberg Rule: Speed) [cite: 2026-02-11]
    const resizeObserver = new ResizeObserver(() => {
      window.requestAnimationFrame(updateEnvironment)
    })

    resizeObserver.observe(document.body)
    updateEnvironment()

    return () => {
      clearTimeout(diagnosisTimer)
      resizeObserver.disconnect()
    }
  }, [])

  return env
}
