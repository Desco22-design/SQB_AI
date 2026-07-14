"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

/**
 * A plain string is used when the submitted value and the visible text are the
 * same. Use the object form when they differ - e.g. a lesson whose id is stored
 * but whose title is shown. `hint` renders as a separate chip to the right of
 * the label (used for the lesson date, so it reads apart from the topic).
 */
export type SelectOption =
  | string
  | { value: string; label: string; hint?: string; disabled?: boolean };

type SelectFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  options: readonly SelectOption[];
  /** Bumped by the parent (e.g. on form reset) to clear the selection. */
  resetSignal?: number;
};

export function SelectField({
  name,
  label,
  placeholder,
  options,
  resetSignal,
}: SelectFieldProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  const items = options.map((o) =>
    typeof o === "string"
      ? { value: o, label: o, hint: undefined, disabled: false }
      : o
  );
  const selected = items.find((o) => o.value === value);

  // Close on outside click
  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  // Clear selection when parent resets the form
  useEffect(() => {
    if (resetSignal !== undefined) {
      setValue("");
      setOpen(false);
    }
  }, [resetSignal]);

  const choose = (optValue: string) => {
    // A disabled option (e.g. a lesson with no seats left) must never become the
    // submitted value - guard here as well as in the click handler.
    if (items.find((o) => o.value === optValue)?.disabled) return;
    setValue(optValue);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setActiveIndex((i) => Math.min(i + 1, items.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    }
    if (e.key === "Enter" && open && activeIndex >= 0) {
      e.preventDefault();
      choose(items[activeIndex].value);
    }
  };

  return (
    <div className="relative sm:col-span-2" ref={ref}>
      <label className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-white/45">
        {label}
      </label>

      {/* Hidden field so the value is picked up by the form's FormData */}
      <input type="hidden" name={name} value={value} />

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm outline-none transition-colors ${
          open
            ? "border-violet-400/60 bg-white/[0.06]"
            : "border-white/[0.08] bg-white/[0.03] hover:border-white/20"
        } ${value ? "text-white" : "text-white/35"}`}
      >
        <span className="flex min-w-0 flex-1 items-center gap-2.5">
          <span className="truncate">{selected?.label || placeholder}</span>
          {selected?.hint && (
            <span className="shrink-0 rounded-full border border-white/[0.08] bg-white/[0.05] px-2.5 py-0.5 text-[11px] text-white/55">
              {selected.hint}
            </span>
          )}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-violet-300 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            // `select-popup` lets globals.css flip this panel to a light surface
            // inside `.theme-light` sections - a dark popup floating over white
            // content reads as a bug (see the school signup form).
            // The max-height + scroll matters for long lists (14 school lessons):
            // without it the tail of the list is clipped off-screen and those
            // options can never be picked.
            className="select-popup absolute left-0 right-0 z-30 mt-2 max-h-[min(60vh,20rem)] origin-top overflow-y-auto overflow-x-hidden rounded-2xl border border-white/10 bg-bg-3/95 p-1.5 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl"
          >
            {items.map((opt, i) => {
              const isSelected = opt.value === value;
              const isActive = i === activeIndex;
              return (
                <li key={opt.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={opt.disabled}
                    disabled={opt.disabled}
                    onMouseEnter={() => !opt.disabled && setActiveIndex(i)}
                    onClick={() => choose(opt.value)}
                    // A disabled option must still be legible - the user needs to
                    // read which lesson is full. The red chip carries that signal,
                    // not an unreadable label.
                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors ${
                      opt.disabled
                        ? "cursor-not-allowed text-white/55"
                        : isSelected
                          ? "bg-violet-500/15 text-violet-100"
                          : isActive
                            ? "bg-white/[0.06] text-white"
                            : "text-white/70"
                    }`}
                  >
                    <span className="min-w-0 flex-1 truncate">{opt.label}</span>
                    <span className="flex shrink-0 items-center gap-2">
                      {opt.hint && (
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[11px] ${
                            opt.disabled
                              ? "border-rose-400/25 bg-rose-400/10 text-rose-300/80"
                              : "border-white/[0.08] bg-white/[0.05] text-white/50"
                          }`}
                        >
                          {opt.hint}
                        </span>
                      )}
                      {isSelected && (
                        <Check size={15} className="text-violet-300" />
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
