"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

type SelectFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  options: readonly string[];
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

  const choose = (opt: string) => {
    setValue(opt);
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
      setActiveIndex((i) => Math.min(i + 1, options.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    }
    if (e.key === "Enter" && open && activeIndex >= 0) {
      e.preventDefault();
      choose(options[activeIndex]);
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
        <span className="truncate">{value || placeholder}</span>
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
            className="absolute left-0 right-0 z-30 mt-2 origin-top overflow-hidden rounded-2xl border border-white/10 bg-bg-3/95 p-1.5 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl"
          >
            {options.map((opt, i) => {
              const isSelected = opt === value;
              const isActive = i === activeIndex;
              return (
                <li key={opt}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => choose(opt)}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors ${
                      isSelected
                        ? "bg-violet-500/15 text-violet-100"
                        : isActive
                          ? "bg-white/[0.06] text-white"
                          : "text-white/70"
                    }`}
                  >
                    <span className="truncate">{opt}</span>
                    {isSelected && (
                      <Check size={15} className="shrink-0 text-violet-300" />
                    )}
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
