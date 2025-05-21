'use client'

import * as React from 'react'
import clsx from 'clsx'

export const Input = React.forwardRef(function Input(
  { className = '', type = 'text', ...props },
  ref
) {
  return (
    <input
      type={type}
      ref={ref}
      className={clsx(
        "block w-full rounded-lg border border-gray-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition disabled:bg-gray-100 disabled:opacity-60",
        className
      )}
      {...props}
    />
  )
})

export default Input 