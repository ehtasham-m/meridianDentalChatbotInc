"use client";

import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerFieldProps {
  value: string;
  onChange: (date: string) => void;
  error?: boolean;
  id?: string;
}

const WEEKDAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_LABELS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function toISODate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function formatDisplay(iso: string) {
  const [y = 0, m = 1, d = 1] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export function DatePickerField({ value, onChange, error, id }: DatePickerFieldProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const initialView = value ? new Date(value + "T00:00:00") : today;
  const [viewYear, setViewYear] = useState(initialView.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialView.getMonth());
  const [open, setOpen] = useState(false);

  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const startWeekday = firstOfMonth.getDay();
  const cells: (Date | null)[] = [
    ...Array(startWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(viewYear, viewMonth, i + 1)),
  ];

  function goMonth(delta: number) {
    const next = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          id={id}
          type="button"
          className={cn(
            "flex h-[52px] w-full items-center justify-between rounded-xl2 border bg-warm-100 px-4 text-left text-[14.5px] transition-colors focus:outline-none",
            error ? "border-red-400" : "border-line focus:border-navy-700",
            value ? "text-navy-700" : "text-ink-faint"
          )}
        >
          {value ? formatDisplay(value) : "Select a date"}
          <CalendarDays size={16} className="text-ink-muted" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={8}
          className="z-[60] w-[300px] rounded-xl2 border border-line bg-warm-100 p-4 shadow-card-hover"
        >
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              aria-label="Previous month"
              onClick={() => goMonth(-1)}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-surface"
            >
              <ChevronLeft size={15} />
            </button>
            <p className="text-[14px] font-medium text-navy-700">
              {MONTH_LABELS[viewMonth]} {viewYear}
            </p>
            <button
              type="button"
              aria-label="Next month"
              onClick={() => goMonth(1)}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-surface"
            >
              <ChevronRight size={15} />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {WEEKDAY_LABELS.map((w, i) => (
              <span key={`${w}-${i}`} className="py-1 text-[11px] font-medium text-ink-faint">
                {w}
              </span>
            ))}
            {cells.map((date, i) => {
              if (!date) return <span key={`empty-${i}`} />;
              const iso = toISODate(date);
              const isPast = date < today;
              const isSelected = value === iso;
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={isPast}
                  onClick={() => {
                    onChange(iso);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-[13px] transition-colors",
                    isPast && "cursor-not-allowed text-ink-faint/50",
                    !isPast && !isSelected && "text-ink hover:bg-surface",
                    isSelected && "bg-navy-700 font-medium text-warm-100"
                  )}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
