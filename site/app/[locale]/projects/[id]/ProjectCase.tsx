"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import type { Project } from "@/lib/data";
import type { ProjectDetail, Tri } from "@/lib/project-details";
import { DETAIL_LABELS, getProjectMetrics } from "@/lib/project-details";
import { useT, useLang, useLocaleHref } from "@/components/LanguageProvider";
import { pickLangStrict } from "@/lib/i18n-utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const statusDot = (s: Project["status"]) =>
  s === "Production" ? "bg-emerald-400" : s === "Release" ? "bg-violet-400" : "bg-amber-300";

export default function ProjectCase({
  project,
  detail,
}: {
  project: Project;
  detail: ProjectDetail | null;
}) {
  const router = useRouter();
  const t = useT();
  const { locale } = useLang();
  const localeHref = useLocaleHref();
  const tr = (v: Tri) => v[locale] ?? v.ru ?? v.en;
  const lbl = (v: { uz: string; ru: string; en: string }) => v[locale] ?? v.ru;

  const handleBack = () => {
    if (window.history.length > 1) router.back();
    else router.push(localeHref("/#projects"));
  };

  const name = pickLangStrict(project.name, locale);
  const short = pickLangStrict(project.short, locale);
  const tagline = detail ? tr(detail.tagline) : short;
  const hero = detail?.heroImage;
  // Prefer the centralized localized metrics; fall back to the DB's
  // English-only impact tiles for any project not listed there.
  const localizedMetrics = getProjectMetrics(project.id);
  const metrics = localizedMetrics
    ? localizedMetrics.map((m) => ({ value: tr(m.value), label: tr(m.label) }))
    : project.impact.map((m) => ({ value: m.value, label: m.label }));

  return (
    <>
      <Navbar />
      <main>
        {/* ---------------------------- HERO (light) ---------------------------- */}
        <section
          data-theme="light"
          className="relative overflow-hidden bg-gradient-to-br from-[#e9f1fc] via-[#f5f8fd] to-[#eaf0f9] text-[#0A0A14]"
        >
          <div className="pointer-events-none absolute -left-40 -top-24 h-[520px] w-[520px] rounded-full bg-sky-300/25 blur-[130px]" />
          <div className="pointer-events-none absolute -right-24 top-6 h-[480px] w-[480px] rounded-full bg-violet-300/20 blur-[130px]" />

          <div className="container-x relative pt-28 pb-16 md:pt-32 md:pb-20">
            <button
              type="button"
              onClick={handleBack}
              className="mb-10 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-black/70 backdrop-blur transition-colors hover:bg-white"
            >
              <ArrowLeft size={16} /> {lbl(DETAIL_LABELS.back)}
            </button>

            <div
              className={`grid items-center gap-8 ${hero ? "lg:grid-cols-[0.9fr,1.1fr]" : ""}`}
            >
              {/* Left - copy */}
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="h-3.5 w-3.5 rounded-[4px] bg-red-500" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0B2B5B]/75">
                    {project.direction}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/70 px-2.5 py-0.5 text-[11px] font-medium text-black/60">
                    <span className={`h-1.5 w-1.5 rounded-full ${statusDot(project.status)}`} />
                    {project.status}
                  </span>
                </div>

                <h1 className="mt-5 font-display text-4xl font-bold leading-[1.03] tracking-tight text-[#0B2B5B] md:text-6xl">
                  {name}
                </h1>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-black/60">
                  {tagline}
                </p>

                {metrics.length > 0 && (
                  <div className="mt-9 grid max-w-xl grid-cols-3 gap-3">
                    {metrics.map((m, i) => (
                      <div
                        key={i}
                        className="rounded-2xl border border-black/[0.07] bg-white/80 p-4 shadow-[0_12px_30px_-22px_rgba(11,43,91,0.4)] backdrop-blur"
                      >
                        <div className="font-display text-2xl font-bold text-[#0B2B5B]">
                          {m.value}
                        </div>
                        <div className="mt-1 text-[11px] leading-snug text-black/50">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {project.technologies.length > 0 && (
                  <div className="mt-7">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-black/35">
                      {lbl(DETAIL_LABELS.techStack)}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-black/10 bg-white/70 px-3 py-1.5 text-xs font-medium text-black/65"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right - tablet mockup (clean transparent cutout + soft shadow),
                  pushed toward the right edge. */}
              {hero && (
                <div
                  className={`relative mx-auto w-full max-w-[720px] lg:max-w-none ${
                    hero.wrapClass ??
                    "lg:w-[124%] lg:translate-x-[14%] xl:translate-x-[18%]"
                  }`}
                >
                  <Image
                    src={hero.src}
                    alt={hero.alt}
                    width={hero.w}
                    height={hero.h}
                    priority
                    sizes="(max-width: 1024px) 96vw, 820px"
                    className="h-auto w-full"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* --------------------------- CONTENT (light) --------------------------- */}
        <div data-theme="light" className="bg-[#FAFBFD] text-[#0A0A14]">
          <div className="container-x py-16 md:py-24">
            <div className="space-y-16 md:space-y-24">
              {detail ? (
                detail.sections.map((sec, i) => (
                  <Section key={i} index={i + 1} section={sec} tr={tr} />
                ))
              ) : (
                <BasicSection project={project} locale={locale} />
              )}
            </div>

            {/* Closing CTA */}
            <div className="mt-20 overflow-hidden rounded-3xl border border-black/[0.06] bg-gradient-to-br from-violet-600 to-violet-800 p-8 text-white md:p-12">
              <div className="max-w-2xl">
                <h2 className="font-display text-2xl font-semibold md:text-3xl">
                  {locale === "ru"
                    ? "Хотите узнать больше о проекте?"
                    : locale === "en"
                      ? "Want to know more about this project?"
                      : "Loyiha haqida ko'proq bilmoqchimisiz?"}
                </h2>
                <p className="mt-3 text-white/80">
                  {locale === "ru"
                    ? "Свяжитесь с командой SQB AI - расскажем детали и покажем платформу в работе."
                    : locale === "en"
                      ? "Reach out to the SQB AI team - we'll share the details and show the platform in action."
                      : "SQB AI jamoasi bilan bog'laning - tafsilotlarni aytamiz va platformani ishda ko'rsatamiz."}
                </p>
                <Link
                  href={localeHref("/#contact")}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-violet-700 transition-transform hover:-translate-y-0.5"
                >
                  {t.nav.apply}
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

/* ------------------------------ building blocks ------------------------------ */

const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-90px" },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
};

function SectionShell({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  const num = String(index).padStart(2, "0");
  return (
    <motion.section
      {...reveal}
      className="grid gap-6 lg:grid-cols-[248px,1fr] lg:gap-16"
    >
      <div>
        <div className="lg:sticky lg:top-28">
          <div className="flex items-center gap-3">
            <span className="font-display text-xs font-semibold tracking-widest text-violet-500">
              {num}
            </span>
            <span className="h-px w-8 bg-violet-400/50" />
          </div>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[#0A0A14] md:text-[1.9rem]">
            {title}
          </h2>
        </div>
      </div>
      <div className="min-w-0">{children}</div>
    </motion.section>
  );
}

function Section({
  index,
  section,
  tr,
}: {
  index: number;
  section: ProjectDetail["sections"][number];
  tr: (v: Tri) => string;
}) {
  if (section.kind === "paragraph") {
    return (
      <SectionShell index={index} title={tr(section.label)}>
        <p className="text-lg leading-relaxed text-black/70">
          {tr(section.body)}
        </p>
      </SectionShell>
    );
  }

  if (section.kind === "bullets") {
    return (
      <SectionShell index={index} title={tr(section.label)}>
        {section.intro && (
          <p className="mb-8 text-[15px] leading-relaxed text-black/65">
            {tr(section.intro)}
          </p>
        )}
        <ul className="grid gap-x-12 sm:grid-cols-2">
          {section.items.map((it, i) => (
            <li
              key={i}
              className="flex gap-3.5 border-b border-black/[0.07] py-4"
            >
              <Check size={18} className="mt-0.5 shrink-0 text-violet-500" />
              <span className="text-[15px] leading-relaxed text-black/70">
                {tr(it)}
              </span>
            </li>
          ))}
        </ul>
      </SectionShell>
    );
  }

  if (section.kind === "cards") {
    // Discrete feature items read best as clean cards.
    return (
      <SectionShell index={index} title={tr(section.label)}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {section.items.map((it, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_14px_40px_-30px_rgba(11,43,91,0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_54px_-28px_rgba(124,58,237,0.4)]"
            >
              <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-violet-500 to-cyan-400 transition-transform duration-300 group-hover:scale-x-100" />
              <div className="font-display text-xs font-semibold tracking-widest text-violet-500">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-3 font-display text-base font-semibold text-[#0A0A14]">
                {tr(it.title)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/60">
                {tr(it.body)}
              </p>
            </div>
          ))}
        </div>
      </SectionShell>
    );
  }

  if (section.kind === "stats") {
    // Big open numbers separated by hairlines - no tiles.
    return (
      <SectionShell index={index} title={tr(section.label)}>
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-black/[0.08]">
          {section.items.map((it, i) => (
            <div key={i} className="px-0 lg:px-6 lg:first:pl-0">
              <div className="whitespace-nowrap bg-gradient-to-br from-violet-600 to-cyan-500 bg-clip-text font-display text-[2rem] font-bold text-transparent md:text-4xl">
                {it.value}
              </div>
              <div className="mt-2 text-sm text-black/55">{tr(it.label)}</div>
            </div>
          ))}
        </div>
      </SectionShell>
    );
  }

  if (section.kind === "keyvalue") {
    // Definition rows on hairlines - no outer box.
    return (
      <SectionShell index={index} title={tr(section.label)}>
        <dl className="border-t border-black/[0.08]">
          {section.items.map((it, i) => (
            <div
              key={i}
              className="grid gap-1 border-b border-black/[0.08] py-5 sm:grid-cols-[220px,1fr] sm:gap-8"
            >
              <dt className="font-display text-sm font-semibold text-violet-700">
                {tr(it.key)}
              </dt>
              <dd className="text-[15px] leading-relaxed text-black/65">
                {tr(it.value)}
              </dd>
            </div>
          ))}
        </dl>
      </SectionShell>
    );
  }

  if (section.kind === "gallery") {
    return (
      <SectionShell index={index} title={tr(section.label)}>
        <div className="gap-6 [column-fill:_balance] sm:columns-2">
          {section.items.map((it, i) => (
            <figure
              key={i}
              className="group mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_20px_50px_-30px_rgba(10,10,20,0.45)]"
            >
              <div className="flex items-center gap-1.5 border-b border-black/[0.05] px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                <figcaption className="ml-2 truncate text-xs font-medium text-black/45">
                  {tr(it.caption)}
                </figcaption>
              </div>
              <Image
                src={it.src}
                alt={tr(it.caption)}
                width={it.w}
                height={it.h}
                sizes="(max-width: 640px) 100vw, 50vw"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.015]"
              />
            </figure>
          ))}
        </div>
      </SectionShell>
    );
  }

  // compare - clean table, hairlines only, SQB column accented.
  return (
    <SectionShell index={index} title={tr(section.label)}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-black/15">
              {section.columns.map((c, i) => (
                <th
                  key={i}
                  className={`px-4 py-3 text-left font-semibold ${
                    i === 2 ? "text-violet-700" : "text-black/45"
                  }`}
                >
                  {tr(c)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row, i) => (
              <tr key={i} className="border-b border-black/[0.07]">
                <td className="px-4 py-4 font-medium text-black/75">
                  {tr(row.need)}
                </td>
                <td className="px-4 py-4 text-black/45">{tr(row.a)}</td>
                <td className="px-4 py-4 font-semibold text-violet-700">
                  {tr(row.b)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}

/* --------------------------- basic fallback (no detail) --------------------------- */

function BasicSection({
  project,
  locale,
}: {
  project: Project;
  locale: ReturnType<typeof useLang>["locale"];
}) {
  const problem = pickLangStrict(project.problem, locale);
  const solution = pickLangStrict(project.solution, locale);
  const problemTitle = locale === "ru" ? "Проблема" : locale === "en" ? "Problem" : "Muammo";
  const solutionTitle = locale === "ru" ? "Решение" : locale === "en" ? "Solution" : "Yechim";
  return (
    <div className="space-y-16 md:space-y-24">
      {problem && (
        <SectionShell index={1} title={problemTitle}>
          <p className="text-lg leading-relaxed text-black/70">{problem}</p>
        </SectionShell>
      )}
      {solution && (
        <SectionShell index={2} title={solutionTitle}>
          <p className="text-lg leading-relaxed text-black/70">{solution}</p>
        </SectionShell>
      )}
    </div>
  );
}
