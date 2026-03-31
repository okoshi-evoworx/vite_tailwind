// Accessibility testing
// https://playwright.dev/docs/accessibility-testing
// @axe-core/playwright によるアクセシビリティテストの自動化
// https://azukiazusa.dev/blog/axe-core-playwright/
import { test, expect } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";

test("a11y", async ({ page }) => {
  // previewサーバーにアクセス
  await page.goto("http://localhost:4173");

  // axe-core を使ってアクセシビリティテストを実行
  const results = await new AxeBuilder({ page })
    // .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .withTags(['wcag2a'])// WCAG 2.0 A
    .exclude('#commonly-reused-element-with-known-issue')
    .analyze()

  results.violations.forEach((violation) => {
    console.log(violation);
  });

  // アクセシビリティテストの結果を出力
  expect(results.violations).toEqual([]);
});