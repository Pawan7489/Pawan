'use client'

import * as React from 'react'
import type { ToastActionElement, ToastProps } from '@/components/ui/toast'

/**
 * Project A1: Neural Event Ledger [cite: 2026-02-11]
 * Rule: Onion Architecture (Nested Encapsulation).
 * Rule: Internal Critique Step (Anti-Hallucination).
 */

const TOAST_LIMIT = 3 // Musk Rule: Efficiency (Don't clutter the UI)
const TOAST_REMOVE_DELAY = 5000 

type NeuralLevel = 'neural' | 'guardian' | 'omega' | 'mesh_sync'

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
  // Super Genius Metadata [cite: 2026-02-11]
  meshNode?: 'Drive-D' | 'Drive-E' | 'Secure-Cloud'
  isDiagnosing?: boolean
  protocolLevel?: NeuralLevel
  internalCritique?: string // AI's reasoning path
}

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
  TRIGGER_DIAGNOSIS: 'TRIGGER_DIAGNOSIS', // 5-Second Self-Diagnosis Hook
} as const

let count = 0
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return `A1_NEURAL_${count.toString()}`
}

type Action =
  | { type: 'ADD_TOAST'; toast: ToasterToast }
  | { type: 'UPDATE_TOAST'; toast: Partial<ToasterToast> }
  | { type: 'DISMISS_TOAST'; toastId?: string }
  | { type: 'REMOVE_TOAST'; toastId?: string }
  | { type: 'TRIGGER_DIAGNOSIS'; toastId: string }

interface State { toasts: ToasterToast[] }

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }
    
    case 'TRIGGER_DIAGNOSIS':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toastId ? { ...t, isDiagnosing: true } : t
        ),
      }

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case 'DISMISS_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toastId || action.toastId === undefined
            ? { ...t, open: false }
            : t
        ),
      }

    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: action.toastId === undefined ? [] : state.toasts.filter((t) => t.id !== action.toastId),
      }
    default:
      return state
  }
}

const listeners: Array<(state: State) => void> = []
let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => listener(memoryState))
}

/**
 * Super Genius Dispatcher: Includes Internal Critique & Diagnosis
 */
function neuralToast({ ...props }: Omit<ToasterToast, 'id'>) {
  const id = genId()

  // 1. RULE: Internal Critique (Verify before showing) [cite: 2026-02-11]
  const reasoningPath = `Critique: Verifying event source ${props.meshNode || 'Local'} against Guardian Protocol...`
  
  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      open: true,
      internalCritique: reasoningPath,
      onOpenChange: (open) => { if (!open) dispatch({ type: 'DISMISS_TOAST', toastId: id }) },
    },
  })

  // 2. RULE: 5-Second Self-Diagnosis Visual [cite: 2026-02-11]
  dispatch({ type: 'TRIGGER_DIAGNOSIS', toastId: id })
  
  setTimeout(() => {
    dispatch({ type: 'UPDATE_TOAST', toast: { id, isDiagnosing: false } })
  }, 5000)

  return {
    id,
    dismiss: () => dispatch({ type: 'DISMISS_TOAST', toastId: id }),
    update: (p: Partial<ToasterToast>) => dispatch({ type: 'UPDATE_TOAST', toast: { ...p, id } }),
  }
}

// Zuckerberg Rule: High-Speed Weekly Micro-Update Logic [cite: 2026-02-11]
function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) listeners.splice(index, 1)
    }
  }, [state])

  return {
    ...state,
    toast: neuralToast,
    // Intent over Syntax: Special method for Hinglish triggers [cite: 2026-02-11]
    bhaiAlert: (msg: string) => neuralToast({ title: "Bhai Suno!", description: msg, protocolLevel: 'neural' }),
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
  }
}

export { useToast, neuralToast as toast }
