"use client";

import { useEffect, useRef } from "react";

/**
 * Infinite horizontal marquee that auto-scrolls AND can be dragged with the
 * cursor (or finger). Children must already be duplicated (two identical copies)
 * so the loop is seamless; the track wraps at half its width.
 *
 * Replaces the CSS `animate-marquee` so the auto-scroll and manual drag share a
 * single source of truth (a transform driven by requestAnimationFrame). Speed is
 * matched to the old CSS animation: half the width every SECONDS_PER_HALF.
 */
const SECONDS_PER_HALF = 35; // matches the previous `marquee 35s linear` keyframe
const DRAG_THRESHOLD_PX = 5; // movement beyond this counts as a drag, not a click

export function DragMarquee({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0); // px scrolled; content is translated by -offset
  const half = useRef(0); // half the track width (one full copy)
  const hovered = useRef(false);
  const pressed = useRef(false); // pointer is down (may become a drag or a click)
  const dragging = useRef(false); // movement passed the threshold - it is a drag
  const startX = useRef(0);
  const startOffset = useRef(0);
  const moved = useRef(false); // did this press turn into a drag? (suppresses click)

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const measure = () => {
      half.current = track.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    const wrap = () => {
      const h = half.current || 1;
      // Keep offset within [0, h) so both copies stay aligned - a seamless loop.
      offset.current = ((offset.current % h) + h) % h;
    };

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!hovered.current && !pressed.current && !reduceMotion) {
        offset.current += (half.current / SECONDS_PER_HALF) * dt;
        wrap();
        track.style.transform = `translate3d(${-offset.current}px,0,0)`;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  const applyTransform = () => {
    const track = trackRef.current;
    if (track) track.style.transform = `translate3d(${-offset.current}px,0,0)`;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    // Ignore right/middle clicks. Do NOT capture the pointer yet: capturing on
    // press retargets the following click to this container, which swallows the
    // click on the inner links (the "read"/"details" buttons stopped working).
    // We only capture once the press actually becomes a drag (see onPointerMove).
    if (e.button !== 0) return;
    pressed.current = true;
    dragging.current = false;
    moved.current = false;
    startX.current = e.clientX;
    startOffset.current = offset.current;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pressed.current) return;
    const dx = e.clientX - startX.current;

    if (!dragging.current) {
      // Still could be a click; only promote to a drag past the threshold.
      if (Math.abs(dx) <= DRAG_THRESHOLD_PX) return;
      dragging.current = true;
      moved.current = true;
      try {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      } catch {
        /* not capturable (e.g. synthetic events) - drag still works */
      }
    }

    // Dragging right (dx > 0) reveals earlier items, so offset decreases.
    const h = half.current || 1;
    offset.current = (((startOffset.current - dx) % h) + h) % h;
    applyTransform();
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!pressed.current) return;
    pressed.current = false;
    if (dragging.current) {
      dragging.current = false;
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        /* nothing to release */
      }
    }
  };

  // A click fires after a drag ends; suppress it so a dragged card does not also
  // navigate. Genuine clicks (no movement past the threshold) pass through.
  const onClickCapture = (e: React.MouseEvent) => {
    if (moved.current) {
      e.preventDefault();
      e.stopPropagation();
      moved.current = false;
    }
  };

  return (
    <div
      className={`cursor-grab select-none active:cursor-grabbing ${className ?? ""}`}
      style={{ touchAction: "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onMouseEnter={() => {
        hovered.current = true;
      }}
      onMouseLeave={() => {
        hovered.current = false;
      }}
      onClickCapture={onClickCapture}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {children}
      </div>
    </div>
  );
}
