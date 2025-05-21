import React from 'react'
import clsx from 'clsx'

/**
 * Badge component
 * 
 * Props:
 * - children: badge content
 * - className: extra Tailwind classes
 * - variant: 'default' | 'outline'
 */
export function Badge({ children, className = '', variant = 'default', ...props }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold transition",
        variant === 'outline'
          ? "border border-blue-200 bg-white text-blue-700"
          : "bg-blue-100 text-blue-700",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge 