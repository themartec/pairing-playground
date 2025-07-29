import { expect, describe, it, vi } from "vitest";
import healthCheckHandler from "./healthCheckHandler";

describe("healthCheckHandler", () => {
  it("returns a healthcheck OK and timestamp", async () => {
    const mockReq = { body: {} } as any;
    const mockRes = { json: vi.fn() };

    await healthCheckHandler(mockReq, mockRes);

    const response = mockRes.json.mock.calls[0][0];
    expect(response.status).toBe("ok");
    expect(response.timestamp).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/,
    );
  });
});
