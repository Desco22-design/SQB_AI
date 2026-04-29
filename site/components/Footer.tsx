"use client";
import Image from "next/image";
import { useT } from "./LanguageProvider";

export default function Footer() {
  const t = useT();
  return (
    <footer className="relative border-t border-white/[0.06] bg-bg-0">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />
      <div className="container-x grid grid-cols-1 gap-10 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/sqb-logo.png"
              alt="SQB"
              width={96}
              height={32}
              className="h-8 w-auto"
            />
            <span className="text-sm text-white/55">/ AI</span>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/50">
            {t.footer.tagline}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
          <FooterCol
            title={t.footer.explore}
            links={[
              { label: t.nav.about, href: "#about" },
              { label: t.nav.projects, href: "#projects" },
              { label: t.nav.features, href: "#features" },
              { label: t.nav.team, href: "#team" }
            ]}
          />
          <FooterCol
            title={t.footer.engage}
            links={[
              { label: t.nav.impact, href: "#impact" },
              { label: t.news.eyebrow, href: "#news" },
              { label: t.events.eyebrow, href: "#events" },
              { label: t.gallery.eyebrow, href: "#gallery" }
            ]}
          />
          <FooterCol
            title={t.footer.contact}
            links={[
              { label: "ai@sqb.uz" },
              { label: "+998 78 777 11 80" },
              { label: t.contact.address }
            ]}
          />
        </div>
      </div>

      <div className="border-t border-white/[0.04]">
        <div className="container-x flex flex-col items-start justify-between gap-3 py-6 text-xs text-white/40 md:flex-row md:items-center">
          <div>
            © {new Date().getFullYear()} SQB AI · {t.footer.rights}
          </div>
          <div>{t.footer.disclaimer}</div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links
}: {
  title: string;
  links: { label: string; href?: string }[];
}) {
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
        {title}
      </div>
      <ul className="mt-4 space-y-2 text-sm text-white/65">
        {links.map((l) =>
          l.href ? (
            <li key={l.label}>
              <a className="hover:text-white" href={l.href}>
                {l.label}
              </a>
            </li>
          ) : (
            <li key={l.label}>{l.label}</li>
          )
        )}
      </ul>
    </div>
  );
}
