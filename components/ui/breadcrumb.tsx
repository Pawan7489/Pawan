'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronRight, MoreHorizontal, HardDrive, 
  Globe, ShieldCheck, Activity, Zap 
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Project A1: Neural Path Mesh
 * Rule: Distributed Mesh Connectivity (Drive D, E, Cloud as one unit).
 * Rule: Ball-in-Ball Rule (Nested Encapsulation).
 */

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<'nav'> & {
    nodeType?: 'local' | 'cloud' | 'mesh';
    isSecure?: boolean;
  }
>(({ className, nodeType = 'mesh', isSecure = true, ...props }, ref) => (
  <nav 
    ref={ref} 
    aria-label="breadcrumb" 
    className={cn("flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-md", className)}
    {...props} 
  />
))
Breadcrumb.displayName = 'NeuralBreadcrumb'

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<'ol'>
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      'flex flex-wrap items-center gap-2 break-words text-[11px] font-black uppercase tracking-widest text-muted-foreground',
      className
    )}
    {...props}
  />
))
BreadcrumbList.displayName = 'BreadcrumbList'

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<'li'> & { isNode?: boolean }
>(({ className, isNode, ...props }, ref) => (
  <li
    ref={ref}
    className={cn('inline-flex items-center gap-2 group', className)}
    {...props}
  >
    {isNode && <HardDrive className="h-3 w-3 text-primary/60" />}
    {props.children}
  </li>
))
BreadcrumbItem.displayName = 'BreadcrumbItem'

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<'a'> & {
    asChild?: boolean;
    isVerified?: boolean;
  }
>(({ asChild, isVerified = true, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'a'

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Comp
        ref={ref}
        className={cn(
          'transition-all hover:text-primary flex items-center gap-1.5',
          isVerified ? 'text-foreground' : 'text-red-400 animate-pulse',
          className
        )}
        {...props}
      />
    </motion.div>
  )
})
BreadcrumbLink.displayName = 'BreadcrumbLink'

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<'li'>) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn('[&>svg]:w-3.5 [&>svg]:h-3.5 opacity-20', className)}
    {...props}
  >
    {children ?? (
      <motion.div animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ repeat: Infinity, duration: 2 }}>
        <Zap className="h-3 w-3 text-primary" />
      </motion.div>
    )}
  </li>
)
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator'

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<'span'>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn('font-black text-primary flex items-center gap-2', className)}
    {...props}
  >
    <div className="h-1.5 w-1.5 rounded-full bg-primary animate-glow" />
    {props.children}
  </span>
))
BreadcrumbPage.displayName = 'BreadcrumbPage'

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
}
