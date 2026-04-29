"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { team, projects } from "@/lib/data";
import { useT } from "../LanguageProvider";

export default function Team() {
  const t = useT();
  return (
    <section id="team" className="section">
      <div className="aura-side-r" aria-hidden />
      <div className="container-x">
        <div className="text-center">
          <span className="pill-label mx-auto">{t.team.eyebrow}</span>
          <h2 className="section-heading mx-auto mt-5 max-w-3xl">
            {t.team.h2a}
            <span className="gradient-text-violet">{t.team.h2b}</span>
          </h2>
          <p className="section-sub">{t.team.sub}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => {
            const tx = t.team.members[m.id] ?? {
              name: m.name,
              role: m.role,
              bio: m.bio
            };
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
                className="card group p-6"
              >
                <div className="relative mx-auto mb-5 h-24 w-24 overflow-hidden rounded-full border border-violet-400/25 shadow-glow">
                  <Image
                    src={m.photo}
                    alt={tx.name}
                    fill
                    sizes="96px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="text-center">
                  <div className="font-display text-base font-semibold text-white">
                    {tx.name}
                  </div>
                  <div className="mt-0.5 text-[11px] uppercase tracking-[0.16em] text-violet-200/80">
                    {tx.role}
                  </div>
                </div>
                <p className="mt-3 line-clamp-3 text-center text-xs leading-relaxed text-white/55">
                  {tx.bio}
                </p>
                <div className="mt-3 flex flex-wrap justify-center gap-1">
                  {m.skills.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-white/[0.06] bg-white/[0.025] px-1.5 py-0.5 text-[10px] text-white/65"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                {m.projects.length > 0 && (
                  <div className="mt-4 border-t border-white/[0.05] pt-3 text-center">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-white/40">
                      {t.team.projects}
                    </div>
                    <div className="mt-1.5 flex flex-wrap justify-center gap-1">
                      {m.projects.map((pid) => {
                        const proj = projects.find((p) => p.id === pid);
                        if (!proj) return null;
                        const pxn = t.projects.list[proj.id]?.name ?? proj.name;
                        return (
                          <a
                            key={pid}
                            href="#projects"
                            className="rounded-md border border-violet-400/20 bg-violet-500/10 px-1.5 py-0.5 text-[10px] text-violet-100 transition-colors hover:bg-violet-500/20"
                          >
                            {pxn}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
