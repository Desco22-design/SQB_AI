"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useT } from "../LanguageProvider";

const FADE = 0.7;

export default function Hero() {
  const t = useT();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    let raf = 0;
    const tick = () => {
      const dur = v.duration;
      if (!Number.isFinite(dur) || dur <= 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const tCur = v.currentTime;
      let opacity = 1;
      if (tCur < FADE) {
        opacity = tCur / FADE;
      } else if (tCur > dur - FADE) {
        opacity = Math.max(0, (dur - tCur) / FADE);
      }
      v.style.opacity = opacity.toFixed(3);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onPlay = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    v.addEventListener("playing", onPlay);

    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener("playing", onPlay);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-hidden pb-24 pt-36 md:pt-44"
    >
      <div className="absolute inset-0 -z-10 bg-bg-0">
        <div className="hero-halo" />
        <div className="hero-aura" />
        <div className="hero-vignette" />
        <div className="starfield" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg-0" />
      </div>

      <div className="container-x relative">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Content — left */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-1 text-center lg:col-span-8 lg:text-left"
          >
            <span className="pill-label inline-flex lg:flex lg:w-fit">
              <Sparkles size={11} /> {t.hero.eyebrow}
            </span>

            <h1 className="hero-heading mt-6">
              <span className="block whitespace-normal md:whitespace-nowrap">
                {t.hero.h1a}
              </span>
              <span className="block whitespace-normal md:whitespace-nowrap">
                {t.hero.h1b}
              </span>
              <span className="gradient-text-violet block whitespace-normal md:whitespace-nowrap">
                {t.hero.h1c}
              </span>
            </h1>

            <p className="mt-6 text-lg text-white/60 md:text-xl lg:max-w-2xl">
              {t.hero.sub}
            </p>

            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href="#projects"
                className="btn-primary group !px-7 !py-3.5 !text-base"
              >
                {t.hero.ctaPrimary}
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
              <a href="#team" className="btn-ghost !px-7 !py-3.5 !text-base">
                {t.hero.ctaSecondary}
              </a>
            </div>
          </motion.div>

          {/* Video — right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hero-video-wrap order-2 lg:col-span-4"
          >
            <video
              ref={videoRef}
              className="hero-video pointer-events-none"
              src="/media/hero-ai.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              disableRemotePlayback
              controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
              aria-hidden
              style={{ opacity: 0 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
