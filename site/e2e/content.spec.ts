import { test, expect } from "@playwright/test";
import { LOCALES } from "./routes";

/**
 * Detail-route ids live in the database, so these tests discover a real one
 * from the homepage rather than hardcoding a fixture that an admin could
 * delete. If a section is empty the test skips rather than failing - an empty
 * news list is a content state, not a regression.
 */
async function firstDetailHref(
  page: import("@playwright/test").Page,
  locale: string,
  segment: string
): Promise<string | null> {
  await page.goto(`/${locale}`);
  const href = await page
    .locator(`a[href^="/${locale}/${segment}/"]`)
    .first()
    .getAttribute("href")
    .catch(() => null);
  return href;
}

for (const segment of ["news", "events", "team"] as const) {
  test(`a ${segment} detail page renders in every language`, async ({
    page,
  }) => {
    const href = await firstDetailHref(page, "uz", segment);
    test.skip(!href, `no ${segment} items published - nothing to open`);

    const id = href!.split("/").pop()!;

    for (const locale of LOCALES) {
      const res = await page.goto(`/${locale}/${segment}/${id}`);
      expect(
        res?.status(),
        `/${locale}/${segment}/${id} should render`
      ).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("h1").first()).toBeVisible();
    }
  });
}

test("a vacancy detail page renders", async ({ page }) => {
  await page.goto("/uz/careers");
  const href = await page
    .locator('a[href^="/uz/careers/"]')
    .first()
    .getAttribute("href")
    .catch(() => null);
  test.skip(!href, "no vacancies published - nothing to open");

  const res = await page.goto(href!);
  expect(res?.status()).toBe(200);
  await expect(page.locator("h1").first()).toBeVisible();
});

test("the homepage renders its sections, not just the shell", async ({
  page,
}) => {
  await page.goto("/ru");
  // A DB failure still renders the navbar/footer, so assert on real content.
  await expect(page.locator("main, section").first()).toBeVisible();
  await expect(page.locator("h1").first()).toBeVisible();
});

test("the same page shows different text in different languages", async ({
  page,
}) => {
  // Guards the original defect: the server rendered Uzbek for every locale and
  // only swapped to ru/en after hydration, so crawlers saw one language.
  const texts: Record<string, string> = {};

  for (const locale of LOCALES) {
    await page.goto(`/${locale}`);
    texts[locale] = (await page.locator("header").innerText()).trim();
  }

  expect(texts.uz).not.toBe(texts.ru);
  expect(texts.ru).not.toBe(texts.en);
  expect(texts.uz).not.toBe(texts.en);
});
