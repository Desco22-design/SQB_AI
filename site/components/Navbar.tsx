"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, ArrowDown } from "lucide-react";
import { useT } from "./LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#projects", label: t.nav.projects },
    { href: "#features", label: t.nav.features },
    { href: "#team", label: t.nav.team },
    { href: "#impact", label: t.nav.impact },
    { href: "#news", label: t.nav.news },
    { href: "#faq", label: t.nav.faq }
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container-x">
        <div
          className={`flex items-center justify-between rounded-full border border-white/[0.08] px-3 py-2 transition-all duration-500 ${
            scrolled
              ? "bg-bg-0/75 backdrop-blur-2xl shadow-soft"
              : "bg-white/[0.02] backdrop-blur-md"
          }`}
        >
          <a href="#hero" className="flex items-center gap-3 pl-2">
            <Image
              src="/brand/sqb-logo.png"
              alt="SQB"
              width={88}
              height={28}
              className="h-7 w-auto opacity-95"
              priority
            />
            <span className="hidden text-sm font-medium tracking-wide text-white/55 sm:inline">
              <span className="mx-2 text-white/15">/</span>AI
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3.5 py-2 text-sm text-white/70 transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher className="hidden md:inline-flex" />
            <a
              href="#contact"
              className="hidden items-center gap-1.5 rounded-full bg-gradient-to-b from-violet-400 to-violet-600 px-4 py-1.5 text-[12px] font-semibold text-white shadow-glow transition-transform hover:scale-[1.04] md:inline-flex"
            >
              {t.nav.apply}
              <ArrowDown size={13} />
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="rounded-full border border-white/[0.08] bg-white/[0.04] p-2.5 text-white/80 lg:hidden"
              aria-label={t.nav.toggleMenu}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mt-2 rounded-3xl border border-white/[0.08] bg-bg-0/90 p-3 backdrop-blur-2xl lg:hidden">
            <div className="mb-3 flex items-center justify-between px-2">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-violet-400 to-violet-600 px-4 py-1.5 text-[12px] font-semibold text-white shadow-glow"
              >
                {t.nav.apply}
                <ArrowDown size={13} />
              </a>
              <LanguageSwitcher />
            </div>
            <nav className="grid gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm text-white/85 hover:bg-white/[0.05]"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
