import "server-only";

// Fail fast at startup/build if a critical secret is missing, instead of
// surfacing opaque runtime 500s deep inside a request. Only the truly
// non-optional vars are enforced; Telegram/optional ones are read lazily.
const REQUIRED = ["DATABASE_URL", "NEXTAUTH_SECRET"] as const;

const missing = REQUIRED.filter(
  (k) => !process.env[k] || process.env[k]!.trim() === ""
);

if (missing.length > 0) {
  throw new Error(
    `[env] Missing required environment variable(s): ${missing.join(
      ", "
    )}. Configure them in the deployment environment before starting the app.`
  );
}
