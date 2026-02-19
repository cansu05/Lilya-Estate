import { test, expect } from "@playwright/test";

test("home loads and shows hero", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /discover refined living/i }),
  ).toBeVisible();
});

test("listings page loads filters and cards", async ({ page }) => {
  await page.goto("/listings");
  await expect(
    page.getByRole("heading", { name: /all properties/i }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: /apply filters/i })).toBeVisible();
});

test("about and contact routes render", async ({ page }) => {
  await page.goto("/about");
  await expect(
    page.getByRole("heading", { name: /about lilya estate/i }),
  ).toBeVisible();

  await page.goto("/contact");
  await expect(
    page.getByRole("heading", { name: /contact lilya estate/i }),
  ).toBeVisible();
});
