'use client'

import * as React from 'react'
import * as RadixSlider from '@radix-ui/react-slider'
import clsx from 'clsx'

export function Slider({
  value,
  onValueChange,
  min = 1,
  max = 5,
  step = 1,
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <RadixSlider.Root
      className={clsx(
        "relative flex w-full touch-none select-none items-center h-6",
        className
      )}
      min={min}
      max={max}
      step={step}
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      {...props}
    >
      <RadixSlider.Track className="bg-gray-200 relative grow rounded-full h-2">
        <RadixSlider.Range className="absolute bg-blue-500 rounded-full h-2" />
      </RadixSlider.Track>
      {value.map((v, i) => (
        <RadixSlider.Thumb
          key={i}
          className={clsx(
            "block h-5 w-5 rounded-full border-2 border-blue-500 bg-white shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400",
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          )}
        />
      ))}
    </RadixSlider.Root>
  )
}

export default Slider 