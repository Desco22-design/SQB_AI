"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Briefcase, Award, FolderGit2, ArrowUpRight } from "lucide-react";
import type { TeamMemberDetail } from "@/lib/queries";
import { useT, useLang, useLocaleHref } from "@/components/LanguageProvider";
import { pickLang } from "@/lib/i18n-utils";
import { ArticleContent } from "@/components/ArticleContent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TeamProfile({
  member,
}: {
  member: TeamMemberDetail | null;
}) {
  const router = useRouter();
  const t = useT();
  const { locale } = useLang();
  const localeHref = useLocaleHref();

  const handleBack = () => {
    if (window.history.length > 1) router.back();
    else router.push(localeHref("/#team"));
  };

  if (!member) {
    return (
      <>
        <Navbar />
        <main className="container-x section text-center">
          <h1 className="section-heading">404</h1>
          <p className="section-sub">Not found</p>
          <Link href="/#team" className="btn-soft mt-8 inline-flex">
            <ArrowLeft size={16} /> {t.team.back}
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const role = pickLang(member.role, locale);
  const bio = pickLang(member.bio, locale);
  const about = pickLang(member.about, locale);
  const achievements = pickLang(member.achievements, locale);
  const experienceYears = member.experienceYears ?? 0;

  return (
    <>
      <Navbar />
      <main className="theme-light min-h-screen">
        <article className="container-x relative pt-28 pb-20 md:pt-32">
          <button
            type="button"
            onClick={handleBack}
            className="btn-ghost mb-8 !px-4 !py-2 !text-sm"
          >
            <ArrowLeft size={16} /> {t.team.back}
          </button>

          {/* Hero */}
          <div className="grid gap-8 md:grid-cols-[260px,1fr] md:gap-10">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-3xl border border-black/10 shadow-[0_18px_48px_-18px_rgba(10,10,20,0.25)] md:mx-0">
              <Image
                src={member.photo}
                alt={member.name}
                fill
                priority
                sizes="260px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center text-center md:text-left">
              <h1 className="h-display text-3xl font-semibold leading-tight text-black sm:text-4xl md:text-5xl">
                {member.name}
              </h1>
              <div className="mt-3 text-lg font-medium text-violet-700">
                {role}
              </div>
              {experienceYears > 0 && (
                <div className="mt-5 inline-flex items-center justify-center gap-2 self-center rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-800 md:self-start">
                  <Briefcase size={15} />
                  {experienceYears} {t.team.experienceLabel}
                </div>
              )}
              {bio && (
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-black/65">
                  {bio}
                </p>
              )}
            </div>
          </div>

          {/* About */}
          {(about || bio) && (
            <section className="mt-14 max-w-3xl">
              <h2 className="h-display text-xl font-semibold text-black/90 md:text-2xl">
                {t.team.aboutTitle}
              </h2>
              <ArticleContent
                body={about || bio}
                fallback={[bio]}
                className="mt-4 text-base leading-[1.75] text-black/75 md:text-lg md:leading-[1.8]"
              />
            </section>
          )}

          {/* Achievements */}
          {achievements && (
            <section className="mt-12 max-w-3xl">
              <h2 className="h-display flex items-center gap-2 text-xl font-semibold text-black/90 md:text-2xl">
                <Award size={22} className="text-violet-600" />
                {t.team.achievementsTitle}
              </h2>
              <ArticleContent
                body={achievements}
                fallback={[]}
                className="mt-4 text-base leading-[1.75] text-black/75 md:text-lg md:leading-[1.8]"
              />
            </section>
          )}

          {/* Skills */}
          {member.skills.length > 0 && (
            <section className="mt-12 max-w-3xl">
              <h2 className="h-display text-xl font-semibold text-black/90 md:text-2xl">
                {t.team.skillsTitle}
              </h2>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-violet-400/25 bg-violet-500/10 px-3.5 py-1.5 text-sm font-medium text-violet-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {member.projectsDetailed.length > 0 && (
            <section className="mt-12 max-w-5xl">
              <h2 className="h-display flex items-center gap-2 text-xl font-semibold text-black/90 md:text-2xl">
                <FolderGit2 size={22} className="text-violet-600" />
                {t.team.projectsTitle}
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {member.projectsDetailed.map((p) => (
                  <Link
                    key={p.id}
                    href="/#projects"
                    className="group rounded-2xl border border-black/10 bg-black/[0.02] p-5 transition-colors hover:border-violet-400/40 hover:bg-violet-500/[0.04]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-base font-semibold text-black/90">
                        {pickLang(p.name, locale)}
                      </h3>
                      <ArrowUpRight
                        size={16}
                        className="shrink-0 text-violet-500 transition-transform group-hover:translate-x-0.5"
                      />
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-black/60">
                      {pickLang(p.short, locale)}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="mt-14 max-w-3xl">
            <button
              type="button"
              onClick={handleBack}
              className="btn-ghost !px-5 !py-2.5 !text-sm"
            >
              <ArrowLeft size={16} /> {t.team.back}
            </button>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
