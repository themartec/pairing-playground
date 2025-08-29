import { expect, describe, it, vi, beforeEach } from "vitest";
import { NextFunction, Request, Response } from "express";
import apiErrorAndDelaySimulator from "./apiErrorAndDelaySimulator";

describe("apiErrorAndDelaySimulator", () => {
  let mockReq: Request;
  let mockRes: Response;
  let mockNext: NextFunction;
  let consoleLogSpy: any;

  beforeEach(() => {
    mockNext = vi.fn();
    mockReq = { body: {}, url: "/api/test" } as Request;
    mockRes = { json: vi.fn(), status: vi.fn().mockReturnThis() } as any;
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("calls next for /api/ endpoints", async () => {
    mockReq.url = "/api/submit";
    await apiErrorAndDelaySimulator(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalledOnce();
  });

  it("skips simulation for non-/api/ endpoints", async () => {
    mockReq.url = "/some-other-endpoint";
    await apiErrorAndDelaySimulator(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalledOnce();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });

  describe("when API_FAILURE_RATE is set", () => {
    beforeEach(() => {
      process.env.API_FAILURE_RATE = "1.0"; // 100% failure rate
      mockReq.url = "/api/submit"; // Ensure it's an API endpoint
    });

    afterEach(() => {
      process.env.API_FAILURE_RATE = ""; // Reset after test
      consoleLogSpy.mockRestore();
    });

    it("simulates an error based on failure rate for /api/ endpoints", async () => {
      const mockResConst = {
        json: vi.fn(),
        status: vi.fn().mockReturnThis(),
      } as Pick<Response, "json" | "status"> as Response;
      mockReq.url = "/api/submit";
      await apiErrorAndDelaySimulator(mockReq, mockResConst, mockNext);

      const response = mockResConst.json.mock.calls[0][0];
      expect(response).toEqual({
        code: "SERVICE_UNSTABLE",
        error: "Service temporarily unavailable",
        message: "Our servers are experiencing high load. Please try again.",
        retryAfter: 2000,
      });
    });

    it("does not call next if it fails on /api/ endpoints", async () => {
      mockReq.url = "/api/submit";
      await apiErrorAndDelaySimulator(mockReq, mockRes, mockNext);

      expect(mockNext).not.toHaveBeenCalledOnce();
    });

    it("does not simulate failure for non-/api/ endpoints even with failure rate set", async () => {
      mockReq.url = "/some-page";
      await apiErrorAndDelaySimulator(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledOnce();
      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockRes.json).not.toHaveBeenCalled();
    });

    it("logs an error message to the console for /api/ endpoints", async () => {
      mockReq.url = "/api/submit";
      await apiErrorAndDelaySimulator(mockReq, mockRes, mockNext);

      expect(consoleLogSpy).toHaveBeenCalledWith("❌ Simulated API failure");
    });
  });

  describe("when API_DELAY is set to 1000 (1 second)", () => {
    let setTimeoutSpy: any;
    beforeEach(() => {
      process.env.API_DELAY = "1000"; // 1 second delay
      mockReq.url = "/api/submit"; // Ensure it's an API endpoint
      setTimeoutSpy = vi
        .spyOn(global, "setTimeout")
        .mockImplementation((fn) => {
          fn(); // Immediately invoke the callback
          return 1 as any;
        });
    });

    afterEach(() => {
      setTimeoutSpy.mockRestore();
      process.env.API_DELAY = "";
      consoleLogSpy.mockRestore();
    });

    it("adds a delay using setTimeout for 1000ms on /api/ endpoints", async () => {
      mockReq.url = "/api/submit";
      await apiErrorAndDelaySimulator(mockReq, mockRes, mockNext);

      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 1000);
      expect(mockNext).toHaveBeenCalledOnce();
    });

    it("does not add delay for non-/api/ endpoints", async () => {
      mockReq.url = "/some-page";
      await apiErrorAndDelaySimulator(mockReq, mockRes, mockNext);

      expect(setTimeoutSpy).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledOnce();
    });
  });
});
