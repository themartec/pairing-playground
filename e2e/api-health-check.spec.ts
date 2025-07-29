import { test, expect } from "@playwright/test";

test.describe("API Health Check E2E", () => {
  test("responds to health check endpoint", async ({ request }) => {
    const response = await request.get("/api/health");

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("status", "ok");
    expect(responseBody).toHaveProperty("timestamp");
  });
});
