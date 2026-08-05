"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, ArrowDown } from "lucide-react";
import { useLang, useLocaleHref } from "./LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t, locale } = useLang();
  const localeHref = useLocaleHref();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // The homepage is `/uz` | `/ru` | `/en`, never bare `/`. Comparing against
  // "/" made isHome permanently false, which turned every in-page anchor into a
  // full navigation instead of a smooth scroll.
  const isHome = pathname === `/${locale}`;
  // Off the homepage the anchor has to point back at the localised home, or the
  // visitor gets bounced to the default language by the middleware redirect.
  const p = (hash: string) => (isHome ? hash : localeHref(`/${hash}`));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: p("#about"), label: t.nav.about },
    { href: p("#projects"), label: t.nav.projects },
    { href: p("#features"), label: t.nav.features },
    { href: p("#team"), label: t.nav.team },
    { href: p("#impact"), label: t.nav.impact },
    { href: p("#news"), label: t.nav.news },
    { href: p("#careers"), label: t.nav.careers },
    { href: p("#school"), label: t.nav.school },
    { href: p("#faq"), label: t.nav.faq },
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
            scrolled || !isHome
              ? "bg-bg-0/75 backdrop-blur-2xl shadow-soft"
              : "bg-white/[0.02] backdrop-blur-md"
          }`}
        >
          <a href={p("#hero")} className="flex items-center pl-2">
            <Image
              src="/brand/sqb-ai-logo-white.png"
              alt="SQB AI"
              width={161}
              height={36}
              className="h-7 w-auto opacity-95"
              priority
            />
          </a>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-2.5 py-2 text-sm text-white/70 transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher className="hidden md:inline-flex" />
            <a
              href={p("#contact")}
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
                href={p("#contact")}
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
