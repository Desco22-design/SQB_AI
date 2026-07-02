"use client";

import { useEffect } from "react";

// Replaces the root layout when the error happens above/within it, so it must
// render its own <html>/<body>. Keep styles inline (globals.css may not apply).
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="uz">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#06030F",
          color: "#fff",
          fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        <div style={{ maxWidth: 420 }}>
          <h1 style={{ fontSize: 28, fontWeight: 600, margin: 0 }}>
            Nimadir xato ketdi
          </h1>
          <p style={{ opacity: 0.65, marginTop: 12, lineHeight: 1.6 }}>
            Something went wrong. Please try again.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: 24,
              padding: "10px 22px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              color: "#fff",
              background: "linear-gradient(180deg, #6FDDED 0%, #28B6CF 100%)",
            }}
          >
            Qayta urinish / Retry
          </button>
        </div>
      </body>
    </html>
  );
}
