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

  test("should submit form and display response", async ({ page }) => {
    await page.goto("/");

    // Find and fill the message textarea
    const messageField = page.locator('textarea[id*="message"]');
    await expect(messageField).toBeVisible();
    await messageField.fill("This is a test message");

    // Submit the form
    await page.getByRole("button", { name: "Submit" }).click();

    // Wait for the response to appear
    await expect(page.getByText("Response:")).toBeVisible();

    // Verify the response contains expected data
    const responseSection = page.locator("pre");
    await expect(responseSection).toBeVisible();

    // Check that the response contains the expected fields
    const responseText = await responseSection.textContent();
    const response = JSON.parse(responseText || "{}");

    expect(response.success).toBe(true);
    expect(response.message).toBe("Form submitted successfully!");
    expect(response.submissionId).toBeDefined();
    expect(response.data.message).toBe("This is a test message");
  });
});
