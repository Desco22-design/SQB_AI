import { test, expect } from "@playwright/test";

/**
 * The locale refactor gave admin its own root layout and rewrote the auth
 * middleware, so the guard is worth re-proving: every admin URL must bounce an
 * anonymous visitor to the login page, and none of them may leak content.
 */
const GUARDED = [
  "/admin",
  "/admin/news",
  "/admin/team",
  "/admin/projects",
  "/admin/submissions",
  "/admin/school",
  "/admin/audit",
  "/admin/stats",
  "/admin/vacancies",
  "/admin/gallery",
] as const;

test.describe("admin stays behind auth", () => {
  for (const path of GUARDED) {
    test(`${path} redirects an anonymous visitor to the login page`, async ({
      page,
    }) => {
      await page.goto(path);
      await expect(page).toHaveURL(/\/admin\/login/);
    });
  }

  test("the login page itself is reachable", async ({ page }) => {
    const res = await page.goto("/admin/login");
    expect(res?.status()).toBe(200);
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test("admin is never indexed", async ({ page }) => {
    await page.goto("/admin/login");
    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveAttribute("content", /noindex/);
  });

  test("admin is not locale-prefixed", async ({ request }) => {
    // The locale middleware must leave /admin alone; prefixing it would break
    // every bookmark the team has.
    const res = await request.get("/admin/login", { maxRedirects: 0 });
    expect(res.status()).toBe(200);
  });
});
