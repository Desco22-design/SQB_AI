import { defineConfig, devices } from "@playwright/test";

/**
 * These tests run against a *deployed* app, not a mocked one - the public site
 * reads everything from the database, so a run without a real DB proves nothing.
 *
 *   local   : npm run dev            then  npm run test:e2e
 *   preview : BASE_URL=https://<preview>.vercel.app npm run test:e2e
 *
 * Point BASE_URL at a Vercel preview deployment before promoting to production.
 */
const baseURL = process.env.BASE_URL ?? "http://localhost:3000";

export default defineConfig({
  testDir: "./e2e",
  // Redirect assertions depend on the exact response chain, so keep runs
  // deterministic rather than fast-and-flaky.
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  timeout: 30_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
});
