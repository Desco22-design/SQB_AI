"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  MapPin,
  Phone,
  Check,
  Handshake,
  GraduationCap,
  Paperclip,
} from "lucide-react";
import { useLang } from "../LanguageProvider";
import { SelectField } from "../ui/SelectField";

type Mode = "partner" | "intern";

// CV upload constraints (applicant resume). Files go directly from the browser
// to Google (Apps Script Web App) to bypass the serverless request-body limit.
const MAX_CV_BYTES = 15 * 1024 * 1024;
const ALLOWED_CV_EXT = [".pdf", ".doc", ".docx"];

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      const comma = result.indexOf(",");
      resolve(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.onerror = () => reject(new Error("read_failed"));
    reader.readAsDataURL(file);
  });
}

// Internship direction options - same labels across all languages (technical terms)
const DIRECTION_OPTIONS = [
  "Machine Learning (ML)",
  "Data Science",
  "Data Engineering",
  "Backend",
  "Data Analytics",
  "Business Analytics",
  "Project Management (PM)",
] as const;

export default function Contact({
  defaultMode = "partner",
  lockMode = false,
  formOnly = false,
  id = "contact",
}: {
  defaultMode?: Mode;
  lockMode?: boolean;
  formOnly?: boolean;
  id?: string;
} = {}) {
  const { t, locale } = useLang();
  const [mode, setMode] = useState<Mode>(defaultMode);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [resetSignal, setResetSignal] = useState(0);
  const [cvFile, setCvFile] = useState<File | null>(null);
  // Browsers silently block a programmatic navigation that runs after an await
  // (there is no user gesture behind it), so the auto-redirect below cannot be
  // relied on. Keep the link and render a button the user actually clicks.
  const [tgUrl, setTgUrl] = useState<string | null>(null);
  const [cvError, setCvError] = useState<string | null>(null);

  const switchMode = (m: Mode) => {
    if (m === mode) return;
    setMode(m);
    setSent(false);
    setErr(null);
  };

  const onCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvError(null);
    const f = e.target.files?.[0] ?? null;
    if (!f) {
      setCvFile(null);
      return;
    }
    const lower = f.name.toLowerCase();
    if (!ALLOWED_CV_EXT.some((ext) => lower.endsWith(ext))) {
      setCvError(t.careers.cv.invalidType);
      setCvFile(null);
      e.target.value = "";
      return;
    }
    if (f.size > MAX_CV_BYTES) {
      setCvError(t.careers.cv.tooLarge);
      setCvFile(null);
      e.target.value = "";
      return;
    }
    setCvFile(f);
  };

  // Send the resume straight to Google (Apps Script Web App): it saves the file
  // to Drive and appends ФИО + a clickable CV link to the recruitment sheet.
  const uploadCv = async (file: File, fullName: string, honeypot: string) => {
    const url = process.env.NEXT_PUBLIC_RESUME_UPLOAD_URL;
    const token = process.env.NEXT_PUBLIC_RESUME_UPLOAD_TOKEN;
    if (!url) return; // not configured (e.g. local dev without the webhook)
    const fileB64 = await fileToBase64(file);
    await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        token,
        website: honeypot, // bot honeypot - rejected server-side if non-empty
        name: fullName,
        filename: file.name,
        mimeType: file.type || "application/octet-stream",
        fileB64,
      }),
    });
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const company = String(fd.get("company") || "").trim();
    const direction = String(fd.get("direction") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const message = String(fd.get("message") || "").trim();
    const website = String(fd.get("website") || "");
    if (!name || !email || !phone || !message) {
      setErr(t.contact.errAll);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr(t.contact.errEmail);
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: mode,
          name,
          email,
          company,
          direction,
          phone,
          message,
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
        setErr(json.error || t.contact.errAll);
        return;
      }

      // Applicant resume → Google Drive + recruitment sheet (interns only).
      // Done before any Telegram redirect so the request is dispatched first.
      if (mode === "intern" && cvFile) {
        try {
          await uploadCv(cvFile, name, website);
        } catch {
          /* non-blocking: the lead is already recorded via /api/contact */
        }
      }

      setSent(true);
      if (json.telegramUrl) setTgUrl(json.telegramUrl);
      form.reset();
      setCvFile(null);
      setResetSignal((s) => s + 1);
      // Redirect to Telegram bot so the user can link their account.
      if (json.telegramUrl) {
        window.location.href = json.telegramUrl;
      }
    } catch {
      setErr(t.contact.errAll);
    } finally {
      setBusy(false);
    }
  };

  const isIntern = mode === "intern";

  return (
    <section id={id} className="section">
      <div className="container-x">
        <div
          className={
            formOnly
              ? ""
              : "overflow-hidden rounded-[28px] border border-white/[0.08] bg-bg-1 p-1"
          }
        >
          <div
            className={
              formOnly
                ? "relative"
                : "relative overflow-hidden rounded-[24px] bg-gradient-to-br from-bg-1 to-bg-2 p-8 md:p-12"
            }
          >
            {!formOnly && (
              <>
                <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-500/30 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-violet-700/30 blur-3xl" />
              </>
            )}

            <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12">
              {!formOnly && (
              <div className="lg:col-span-5">
                <span className="pill-label">
                  <Send size={11} /> {t.contact.eyebrow}
                </span>
                <h2 className="section-heading mt-5">
                  {t.contact.h2a}
                  <br />
                  <span className="gradient-text-violet">{t.contact.h2b}</span>
                </h2>
                <p className="mt-5 max-w-md text-base text-white/55 md:text-lg">
                  {isIntern ? t.contact.internSub : t.contact.sub}
                </p>

                <ul className="mt-8 space-y-4 text-sm text-white/75">
                  <li className="flex items-center gap-3">
                    <span className="icon-circle !h-9 !w-9">
                      <Mail size={14} />
                    </span>
                    info@sqb.uz
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="icon-circle !h-9 !w-9">
                      <Phone size={14} />
                    </span>
                    +998 78 777 11 80
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="icon-circle !h-9 !w-9">
                      <MapPin size={14} />
                    </span>
                    {t.contact.address}
                  </li>
                </ul>
              </div>
              )}

              <div className={formOnly ? "mx-auto w-full max-w-2xl lg:col-span-12" : "lg:col-span-7"}>
                {formOnly && (
                  <div className="mb-8 text-center">
                    <h2 className="h-display text-2xl sm:text-3xl">
                      {t.careers.formTitle}
                    </h2>
                    <p className="mx-auto mt-3 max-w-lg text-sm text-white/55 md:text-base">
                      {t.careers.formSub}
                    </p>
                  </div>
                )}
                {/* Mode switcher */}
                {!lockMode && (
                <div
                  role="tablist"
                  aria-label="Form type"
                  className="mb-6 inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={!isIntern}
                    onClick={() => switchMode("partner")}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-5 ${
                      !isIntern
                        ? "bg-violet-600 text-white shadow-[0_6px_18px_rgba(124,58,237,0.35)]"
                        : "text-white/55 hover:text-white"
                    }`}
                  >
                    <Handshake size={15} /> {t.contact.partnerTab}
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isIntern}
                    onClick={() => switchMode("intern")}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-5 ${
                      isIntern
                        ? "bg-violet-600 text-white shadow-[0_6px_18px_rgba(124,58,237,0.35)]"
                        : "text-white/55 hover:text-white"
                    }`}
                  >
                    <GraduationCap size={15} /> {t.contact.internTab}
                  </button>
                </div>
                )}

                <motion.form
                  key={mode}
                  onSubmit={submit}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                >
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  />
                  <Field
                    label={t.contact.fields.name}
                    name="name"
                    placeholder={t.contact.fields.namePh}
                  />
                  <Field
                    label={t.contact.fields.email}
                    name="email"
                    type="email"
                    placeholder={t.contact.fields.emailPh}
                  />
                  <Field
                    label={
                      isIntern
                        ? t.contact.fields.university
                        : t.contact.fields.company
                    }
                    name="company"
                    placeholder={
                      isIntern
                        ? t.contact.fields.universityPh
                        : t.contact.fields.companyPh
                    }
                  />
                  <Field
                    label={t.contact.fields.phone}
                    name="phone"
                    type="tel"
                    placeholder={t.contact.fields.phonePh}
                  />

                  {isIntern && (
                    <SelectField
                      name="direction"
                      label={t.contact.fields.direction}
                      placeholder={t.contact.fields.directionPh}
                      options={DIRECTION_OPTIONS}
                      resetSignal={resetSignal}
                    />
                  )}

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-white/45">
                      {isIntern
                        ? t.contact.fields.internMessage
                        : t.contact.fields.message}
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder={
                        isIntern
                          ? t.contact.fields.internMessagePh
                          : t.contact.fields.messagePh
                      }
                      className="w-full resize-none rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-violet-400/60 focus:bg-white/[0.06]"
                    />
                  </div>

                  {isIntern && (
                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-white/45">
                        {t.careers.cv.label}
                      </label>
                      <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-white/[0.14] bg-white/[0.03] px-4 py-3 text-sm text-white/70 transition-colors hover:border-violet-400/50 hover:bg-white/[0.05]">
                        <Paperclip size={16} className="shrink-0 text-violet-300" />
                        <span className="min-w-0 flex-1 truncate">
                          {cvFile ? cvFile.name : t.careers.cv.choose}
                        </span>
                        <span className="hidden shrink-0 text-[11px] text-white/40 sm:inline">
                          {t.careers.cv.hint}
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          onChange={onCvChange}
                          className="hidden"
                        />
                      </label>
                      {cvError && (
                        <p className="mt-2 text-xs text-rose-300">{cvError}</p>
                      )}
                    </div>
                  )}

                  {err && (
                    <div className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-xs text-rose-200 sm:col-span-2">
                      {err}
                    </div>
                  )}

                  {sent && tgUrl ? (
                    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.07] px-5 py-5 text-center sm:col-span-2">
                      <p className="text-sm text-white/75">
                        <Check
                          size={15}
                          className="mr-1.5 inline-block text-emerald-300"
                        />
                        {t.contact.sent}
                      </p>
                      <a href={tgUrl} className="btn-primary mt-4 inline-flex">
                        <Send size={14} />
                        {t.contact.openBot}
                      </a>
                      <p className="mx-auto mt-3 max-w-sm text-xs leading-relaxed text-white/45">
                        {t.contact.openBotHint}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-4 sm:col-span-2">
                      <p className="text-xs text-white/45">{t.contact.privacy}</p>
                      <button
                        type="submit"
                        disabled={busy}
                        className="btn-primary disabled:opacity-70"
                      >
                        {busy ? (
                          t.contact.sending
                        ) : (
                          <>
                            <Send size={14} /> {t.contact.send}
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </motion.form>
              </div>
            </div>
          </div>
        </div>
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
