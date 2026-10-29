"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

export interface RadixSwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?: string;
  description?: string;
}

export const RadixSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  RadixSwitchProps
>(({ className = "", label, description, id, ...props }, ref) => {
  const generatedId = React.useId();
  const switchId = id || generatedId;

  return (
    <div className="flex items-center justify-between gap-3">
      {(label || description) && (
        <label htmlFor={switchId} className="cursor-pointer select-none">
          {label && (
            <span className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB]">
              {label}
            </span>
          )}
          {description && (
            <span className="block text-[11px] text-[#5A6E85] dark:text-[#94A7C4]">
              {description}
            </span>
          )}
        </label>
      )}
      <SwitchPrimitive.Root
        ref={ref}
        id={switchId}
        className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#0066FF] data-[state=unchecked]:bg-slate-300 dark:focus-visible:outline-[#38BDF8] dark:data-[state=checked]:bg-[#2563EB] dark:data-[state=unchecked]:bg-[#1E3358] ${className}`}
        {...props}
      >
        <SwitchPrimitive.Thumb className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" />
      </SwitchPrimitive.Root>
    </div>
  );
});

RadixSwitch.displayName = "RadixSwitch";
