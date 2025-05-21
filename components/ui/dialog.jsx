'use client'

import * as React from 'react'
import { 
  Dialog as RadixDialog, 
  DialogContent as RadixDialogContent, 
  DialogTitle as RadixDialogTitle, 
  DialogDescription as RadixDialogDescription, 
  DialogClose as RadixDialogClose 
} from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { X } from 'lucide-react'

export function Dialog({ open, onOpenChange, children }) {
  return (
    <RadixDialog open={open} onOpenChange={onOpenChange}>
      {children}
    </RadixDialog>
  )
}

export function DialogContent({ className, children, ...props }) {
  return (
    <RadixDialogContent
      className={clsx(
        "fixed z-50 left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 focus:outline-none",
        className
      )}
      {...props}
    >
      <div className="absolute right-4 top-4">
        <DialogClose asChild>
          <button
            className="rounded-full p-1 hover:bg-gray-100 transition"
            aria-label="Cerrar"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </DialogClose>
      </div>
      {children}
    </RadixDialogContent>
  )
}

export function DialogHeader({ children, className }) {
  return (
    <div className={clsx("mb-4", className)}>
      {children}
    </div>
  )
}

export function DialogTitle({ children, className }) {
  return (
    <RadixDialogTitle className={clsx("text-lg font-bold", className)}>
      {children}
    </RadixDialogTitle>
  )
}

export function DialogDescription({ children, className }) {
  return (
    <RadixDialogDescription className={clsx("text-gray-500 text-sm", className)}>
      {children}
    </RadixDialogDescription>
  )
}

export function DialogFooter({ children, className }) {
  return (
    <div className={clsx("flex justify-end gap-2 mt-6", className)}>
      {children}
    </div>
  )
}

export function DialogClose({ children, ...props }) {
  return <RadixDialogClose {...props}>{children}</RadixDialogClose>
} 