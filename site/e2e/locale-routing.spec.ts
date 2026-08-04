import { test, expect } from "@playwright/test";
import { LOCALES, DEFAULT_LOCALE, LEGACY_SEGMENTS, STATIC_PATHS } from "./routes";

test.describe("locale routing", () => {
  test("`/` redirects to the language the browser asked for", async ({
    playwright,
    baseURL,
  }) => {
    const cases: [string, string][] = [
      ["ru-RU,ru;q=0.9", "/ru"],
      ["en-US,en;q=0.9", "/en"],
      ["uz-UZ,uz;q=0.9", "/uz"],
      // Nothing we serve -> the default language, not a 404.
      ["fr-FR,fr;q=0.9", `/${DEFAULT_LOCALE}`],
    ];

    for (const [acceptLanguage, expected] of cases) {
      const ctx = await playwright.request.newContext({
        baseURL,
        extraHTTPHeaders: { "Accept-Language": acceptLanguage },
      });
      const res = await ctx.get("/", { maxRedirects: 0 });
      expect(res.status(), `Accept-Language: ${acceptLanguage}`).toBe(307);
      expect(res.headers()["location"]).toBe(expected);
      await ctx.dispose();
    }
  });

  test("a remembered language wins over the browser header", async ({
    playwright,
    baseURL,
  }) => {
    const ctx = await playwright.request.newContext({
      baseURL,
      extraHTTPHeaders: {
        "Accept-Language": "ru-RU,ru;q=0.9",
        Cookie: "sqbai.locale=en",
      },
    });
    const res = await ctx.get("/", { maxRedirects: 0 });
    expect(res.headers()["location"]).toBe("/en");
    await ctx.dispose();
  });

  test("old un-prefixed URLs permanently redirect into the default locale", async ({
    request,
  }) => {
    for (const segment of LEGACY_SEGMENTS) {
      const from = `/${segment}`;
      const res = await request.get(from, { maxRedirects: 0 });
      // 308, not 302: the mapping is fixed, so the old page's ranking should
      // transfer rather than being treated as a temporary detour.
      expect(res.status(), `${from} should be a permanent redirect`).toBe(308);
      expect(res.headers()["location"]).toBe(`/${DEFAULT_LOCALE}${from}`);
    }
  });

  test("a deep old URL keeps its path when redirected", async ({ request }) => {
    const res = await request.get("/news/some-article-id", { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    expect(res.headers()["location"]).toBe(
      `/${DEFAULT_LOCALE}/news/some-article-id`
    );
  });

  test("an unsupported locale is a 404, not a silent fallback", async ({
    page,
  }) => {
    const res = await page.goto("/de");
    expect(res?.status()).toBe(404);
  });

  for (const locale of LOCALES) {
    test(`/${locale} declares the right language to browsers and crawlers`, async ({
      page,
    }) => {
      await page.goto(`/${locale}`);

      // Screen readers and search engines both key off this attribute; it was
      // hardcoded to "uz" for every language before locales moved into the URL.
      await expect(page.locator("html")).toHaveAttribute("lang", locale);

      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveAttribute(
        "href",
        new RegExp(`/${locale}$`)
      );

      // Every locale must point at every other one, plus x-default, or search
      // engines treat the translations as competing duplicates.
      for (const other of LOCALES) {
        await expect(
          page.locator(`link[rel="alternate"][hreflang="${other}"]`)
        ).toHaveCount(1);
      }
      await expect(
        page.locator('link[rel="alternate"][hreflang="x-default"]')
      ).toHaveCount(1);
    });
  }

  for (const locale of LOCALES) {
    for (const path of STATIC_PATHS) {
      test(`/${locale}${path || ""} renders`, async ({ page }) => {
        const res = await page.goto(`/${locale}${path}`);
        expect(res?.status(), `/${locale}${path} should not error`).toBe(200);
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        // A page that renders its shell but no <main> is a silent failure.
        await expect(page.locator("body")).not.toBeEmpty();
      });
    }
  }
});
