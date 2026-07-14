"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check, Info } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { SelectField, type SelectOption } from "../ui/SelectField";
import {
  GRADES,
  SCHOOL_TOPICS,
  formatLessonDate,
  type Lang,
} from "@/lib/school-program";

export default function SchoolForm({ id = "school-apply" }: { id?: string }) {
  const { t, locale } = useLang();
  const lang = locale as Lang;

  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [resetSignal, setResetSignal] = useState(0);
  // Kept so the student always has a link they can click themselves: browsers
  // silently block a programmatic navigation that happens after an await (no
  // user gesture), which left people stranded on the page with nothing to do.
  const [tgUrl, setTgUrl] = useState<string | null>(null);

  const f = t.school.fields;

  // The grade is stored as a bare "9" | "10" | "11" but shown with the localized
  // word next to it. Uzbek hyphenates ("9-sinf"); ru/en use a space.
  const gradeOptions: SelectOption[] = GRADES.map((g) => ({
    value: g,
    label: lang === "uz" ? `${g}-${f.gradeSuffix}` : `${g} ${f.gradeSuffix}`,
  }));

  // The topic id is what we persist; the student picks by title, with the date
  // shown as a separate chip so the two never read as one run-on line.
  const topicOptions: SelectOption[] = SCHOOL_TOPICS.map((topic) => ({
    value: topic.id,
    label: topic.title[lang],
    hint: formatLessonDate(topic.date, lang),
  }));

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const school = String(fd.get("school") || "").trim();
    const grade = String(fd.get("grade") || "").trim();
    const topicId = String(fd.get("topicId") || "").trim();
    const website = String(fd.get("website") || "");

    if (!name || !email || !school || !grade || !topicId) {
      setErr(t.school.errAll);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr(t.school.errEmail);
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/school", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          school,
          grade,
          topicId,
          website,
          lang: locale,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        telegramUrl?: string | null;
      };
      if (!res.ok || !json.ok) {
        setErr(json.error || t.school.errAll);
        return;
      }

      setSent(true);
      form.reset();
      setResetSignal((s) => s + 1);

      // The bot can only message the student once they have started a chat with
      // it, so hand them to the deep link - it carries their signup token and
      // the bot replies with the lesson date, time and address. The redirect is
      // best-effort (browsers block gesture-less navigation); the button
      // rendered below is the reliable path.
      if (json.telegramUrl) {
        setTgUrl(json.telegramUrl);
        window.location.href = json.telegramUrl;
      }
    } catch {
      setErr(t.school.errAll);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id={id} className="section">
      <div className="mx-auto max-w-2xl px-6">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {t.school.formTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/55">
            {t.school.formSub}
          </p>
        </div>

        {sent && tgUrl ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 text-center"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/12 text-emerald-300">
              <Check size={22} />
            </span>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/70">
              {t.school.sent}
            </p>
            <a href={tgUrl} className="btn-primary mt-6 inline-flex">
              <Send size={14} />
              {t.school.openBot}
            </a>
            <p className="mx-auto mt-4 max-w-sm text-xs leading-relaxed text-white/45">
              {t.school.openBotHint}
            </p>
          </motion.div>
        ) : (
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {/* Honeypot - real students never see or fill this. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />

          <Field label={f.name} name="name" placeholder={f.namePh} full />
          <Field
            label={f.email}
            name="email"
            type="email"
            placeholder={f.emailPh}
          />
          <Field label={f.school} name="school" placeholder={f.schoolPh} />

          <SelectField
            name="grade"
            label={f.grade}
            placeholder={f.gradePh}
            options={gradeOptions}
            resetSignal={resetSignal}
          />
          <SelectField
            name="topicId"
            label={f.topic}
            placeholder={f.topicPh}
            options={topicOptions}
            resetSignal={resetSignal}
          />

          <div className="flex items-start gap-2.5 rounded-2xl border border-violet-400/15 bg-violet-400/[0.06] px-4 py-3 sm:col-span-2">
            <Info size={15} className="mt-0.5 shrink-0 text-violet-300" />
            <p className="text-xs leading-relaxed text-white/60">
              {t.school.tgNote}
            </p>
          </div>

          {err && (
            <div className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-xs text-rose-200 sm:col-span-2">
              {err}
            </div>
          )}

          <div className="flex justify-end sm:col-span-2">
            <button
              type="submit"
              disabled={busy || sent}
              className="btn-primary disabled:opacity-70"
            >
              {sent ? (
                <>
                  <Check size={16} /> {t.school.sent}
                </>
              ) : busy ? (
                t.school.sending
              ) : (
                <>
                  <Send size={14} /> {t.school.submit}
                </>
              )}
            </button>
          </div>
        </motion.form>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  full,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-white/45">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-violet-400/60 focus:bg-white/[0.06]"
      />
    </div>
  );
}
