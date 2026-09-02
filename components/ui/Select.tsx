"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
  error?: boolean;
  id?: string;
}

export function SelectField({
  value,
  onValueChange,
  options,
  placeholder,
  error,
  id,
}: SelectFieldProps) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger
        id={id}
        className={cn(
          "flex h-[52px] w-full items-center justify-between rounded-xl2 border bg-warm-100 px-4 py-3.5 text-left text-[14.5px] text-navy-700 transition-colors focus:outline-none data-[placeholder]:text-ink-faint",
          error ? "border-red-400" : "border-line focus:border-navy-700"
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon>
          <ChevronDown size={16} className="text-ink-muted" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={6}
          className="z-[60] max-h-72 w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl2 border border-line bg-warm-100 shadow-card-hover"
        >
          <SelectPrimitive.Viewport className="p-1.5">
            {options.map((opt) => (
              <SelectPrimitive.Item
                key={opt.value}
                value={opt.value}
                className="relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2.5 text-[14px] text-ink outline-none data-[highlighted]:bg-surface data-[state=checked]:text-navy-700 data-[state=checked]:font-medium"
              >
                <SelectPrimitive.ItemIndicator className="absolute left-3">
                  <Check size={14} className="text-mint-600" />
                </SelectPrimitive.ItemIndicator>
                <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
