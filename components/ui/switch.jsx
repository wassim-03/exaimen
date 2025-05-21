'use client'

import * as React from 'react'
import * as RadixSwitch from '@radix-ui/react-switch'
import clsx from 'clsx'

export function Switch({ checked, onCheckedChange, disabled = false, className = '', ...props }) {
  return (
    <RadixSwitch.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      className={clsx(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className
      )}
      {...props}
    >
      <RadixSwitch.Thumb
        className={clsx(
          "inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform",
          checked ? "translate-x-5 bg-blue-600" : "translate-x-1 bg-gray-300"
        )}
      />
      <span
        className={clsx(
          "absolute left-0 top-0 h-full w-full rounded-full transition-colors",
          checked ? "bg-blue-600" : "bg-gray-300"
        )}
        aria-hidden="true"
      />
    </RadixSwitch.Root>
  )
}

export default Switch 