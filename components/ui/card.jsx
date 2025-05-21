import React from 'react'
import clsx from 'clsx'

/**
 * Card component
 * 
 * Props:
 * - className: extra Tailwind classes
 * - children: card content
 * - as: custom element (default: div)
 */
export function Card({ className = '', children, as: Component = 'div', ...props }) {
  return (
    <Component
      className={clsx(
        "bg-white rounded-2xl shadow-md border border-blue-100 p-6 transition-all",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Card 