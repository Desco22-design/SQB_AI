"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaced to the platform logs; wire a real error tracker (Sentry) here.
    console.error("Route error:", error);
  }, [error]);

  return (
    <main className="grid min-h-screen place-items-center bg-bg-0 px-6 text-center">
      <div className="max-w-md">
        <h1 className="font-display text-3xl font-semibold text-white">
          Nimadir xato ketdi
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-white/60">
          Sahifani yuklab bo‘lmadi. Iltimos, birozdan so‘ng qayta urinib
          ko‘ring. · Something went wrong. Please try again.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="btn-primary mx-auto mt-8 inline-flex"
        >
          Qayta urinish / Retry
        </button>
      </div>
    </main>
  );
}
