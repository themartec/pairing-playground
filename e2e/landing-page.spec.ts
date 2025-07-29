import { test, expect } from "@playwright/test";

test.describe("Landing Page E2E", () => {
  test("should display the landing page correctly", async ({ page }) => {
    await page.goto("/");

    // Check page title
    await expect(page).toHaveTitle("Pairing Playground");

    // Check main heading
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Pairing Playground",
    );

    // Check subtitle
    await expect(page.locator("body")).toContainText(
      "This is where the magic happens",
    );
  });

  test("should be responsive on mobile", async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Check main heading
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Pairing Playground",
    );
  });

  test("should load without console errors", async ({ page }) => {
    // Listen for console errors
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("/");

    // Wait a bit for any potential errors to surface
    await page.waitForTimeout(1000);

    // Verify no console errors occurred
    expect(consoleErrors).toEqual([]);
  });
});
