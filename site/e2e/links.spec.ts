import { test, expect } from "@playwright/test";
import { LOCALES, STATIC_PATHS, isAssetOrApi, hasLocalePrefix } from "./routes";

/**
 * Regression guard for the whole class of bug introduced when locales moved
 * into the URL: any internal link that forgets the prefix gets redirected to
 * the DEFAULT locale, silently throwing a ru/en visitor back to Uzbek.
 *
 * There were 16 such links; a crawl catches the 17th automatically.
 */
test.describe("internal links keep the visitor's language", () => {
  for (const locale of LOCALES) {
    for (const path of STATIC_PATHS) {
      const url = `/${locale}${path}`;

      test(`${url} — every internal link carries the locale`, async ({
        page,
      }) => {
        await page.goto(url);

        const hrefs = await page.locator("a[href]").evaluateAll((anchors) =>
          anchors.map((a) => a.getAttribute("href") ?? "")
        );

        const offenders = hrefs.filter((href) => {
          if (!href.startsWith("/")) return false; // external, mailto:, tel:, #hash
          if (isAssetOrApi(href)) return false;
          return !hasLocalePrefix(href);
        });

        expect(
          offenders,
          `these links drop the language and would bounce the visitor to the default locale`
        ).toEqual([]);
      });
    }
  }

  test("in-page anchors on the homepage scroll instead of navigating", async ({
    page,
  }) => {
    // `isHome` used to compare against "/", which stopped matching once the
    // homepage became /uz. Every anchor silently turned into a full navigation
    // (and lost the language on the way).
    await page.goto("/ru");

    const navAnchors = await page
      .locator('header a[href*="#"]:visible')
      .evaluateAll((anchors) => anchors.map((a) => a.getAttribute("href") ?? ""));

    expect(navAnchors.length).toBeGreaterThan(0);
    for (const href of navAnchors) {
      expect(
        href.startsWith("#"),
        `${href} should be a bare hash on the homepage, not a navigation`
      ).toBe(true);
    }
  });

  test("anchors away from the homepage point back at the localised home", async ({
    page,
  }) => {
    await page.goto("/ru/careers");

    const navAnchors = await page
      .locator('header a[href*="#"]:visible')
      .evaluateAll((anchors) => anchors.map((a) => a.getAttribute("href") ?? ""));

    expect(navAnchors.length).toBeGreaterThan(0);
    for (const href of navAnchors) {
      expect(href, `${href} should return to /ru, not /`).toMatch(/^\/ru[/#]/);
    }
  });
});

test.describe("language switcher", () => {
  // The navbar renders the switcher twice - once for desktop, once inside the
  // mobile menu - so target the visible one instead of whichever comes first
  // in the DOM.
  async function pickLanguage(
    page: import("@playwright/test").Page,
    label: RegExp
  ) {
    await page
      .locator('button[aria-haspopup="listbox"]:visible')
      .first()
      .click();
    await page.locator('[role="option"]:visible', { hasText: label }).click();
  }

  test("switching language stays on the same page", async ({ page }) => {
    await page.goto("/ru/careers");
    await pickLanguage(page, /^EN$/);

    await expect(page).toHaveURL(/\/en\/careers$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("switching language on the homepage lands on the homepage", async ({
    page,
  }) => {
    await page.goto("/uz");
    await pickLanguage(page, /^RU$/);

    await expect(page).toHaveURL(/\/ru$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  });
});
