"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone, Check } from "lucide-react";
import { useT } from "../LanguageProvider";

export default function Contact() {
  const t = useT();
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr(null);
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();
    if (!name || !email || !message) {
      setErr(t.contact.errAll);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr(t.contact.errEmail);
      return;
    }
    setBusy(true);
    await new Promise((r) => setTimeout(r, 700));
    setBusy(false);
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <section id="contact" className="section">
      <div className="container-x">
        <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-bg-1 p-1">
          <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-bg-1 to-bg-2 p-8 md:p-12">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-500/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-violet-700/30 blur-3xl" />

            <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12">
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
                  {t.contact.sub}
                </p>

                <ul className="mt-8 space-y-4 text-sm text-white/75">
                  <li className="flex items-center gap-3">
                    <span className="icon-circle !h-9 !w-9">
                      <Mail size={14} />
                    </span>
                    ai@sqb.uz
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

              <div className="lg:col-span-7">
                <motion.form
                  onSubmit={submit}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45 }}
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                >
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
                    label={t.contact.fields.company}
                    name="company"
                    placeholder={t.contact.fields.companyPh}
                    full
                  />
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-white/45">
                      {t.contact.fields.message}
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder={t.contact.fields.messagePh}
                      className="w-full resize-none rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-violet-400/60 focus:bg-white/[0.06]"
                    />
                  </div>

                  {err && (
                    <div className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-xs text-rose-200 sm:col-span-2">
                      {err}
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-4 sm:col-span-2">
                    <p className="text-xs text-white/45">{t.contact.privacy}</p>
                    <button
                      type="submit"
                      disabled={busy || sent}
                      className="btn-primary disabled:opacity-70"
                    >
                      {sent ? (
                        <>
                          <Check size={16} /> {t.contact.sent}
                        </>
                      ) : busy ? (
                        t.contact.sending
                      ) : (
                        <>
                          <Send size={14} /> {t.contact.send}
                        </>
                      )}
                    </button>
                  </div>
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
  full
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
