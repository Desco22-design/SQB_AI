"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const VISITOR_KEY = "sqb_visitor";
const SESSION_KEY = "sqb_session";
const SESSION_AT_KEY = "sqb_session_at";
const SESSION_IDLE_MS = 30 * 60 * 1000;

function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function getVisitorId(): string {
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = uuid();
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

function getSessionId(): string {
  const now = Date.now();
  const lastAt = Number(localStorage.getItem(SESSION_AT_KEY) || 0);
  let id = localStorage.getItem(SESSION_KEY);
  if (!id || now - lastAt > SESSION_IDLE_MS) {
    id = uuid();
    localStorage.setItem(SESSION_KEY, id);
  }
  localStorage.setItem(SESSION_AT_KEY, String(now));
  return id;
}

export function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;
    if (typeof window === "undefined") return;
    try {
      const visitorId = getVisitorId();
      const sessionId = getSessionId();
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId, sessionId, path: pathname || "/" }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // localStorage may be disabled — silently skip
    }
  }, [pathname]);

  return null;
}
