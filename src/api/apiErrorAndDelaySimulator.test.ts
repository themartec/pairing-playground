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
    mockReq = { body: {} } as any;
    mockRes = { json: vi.fn(), status: vi.fn().mockReturnThis() } as any;
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("calls next", async () => {
    await apiErrorAndDelaySimulator(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalledOnce();
  });

  describe("when API_FAILURE_RATE is set", () => {
    beforeEach(() => {
      process.env.API_FAILURE_RATE = "1.0"; // 100% failure rate
    });

    afterEach(() => {
      process.env.API_FAILURE_RATE = ""; // Reset after test
      consoleLogSpy.mockRestore();
    });

    it("simulates an error based on failure rate", async () => {
      const mockResConst = {
        json: vi.fn(),
        status: vi.fn().mockReturnThis(),
      } as any;
      await apiErrorAndDelaySimulator(mockReq, mockResConst, mockNext);

      const response = mockResConst.json.mock.calls[0][0];
      expect(response).toEqual({
        code: "SERVICE_UNSTABLE",
        error: "Service temporarily unavailable",
        message: "Our servers are experiencing high load. Please try again.",
        retryAfter: 2000,
      });
    });

    it("does not call nex if it fails", async () => {
      await apiErrorAndDelaySimulator(mockReq, mockRes, mockNext);

      expect(mockNext).not.toHaveBeenCalledOnce();
    });

    it("logs an error message to the console", async () => {
      await apiErrorAndDelaySimulator(mockReq, mockRes, mockNext);

      expect(consoleLogSpy).toHaveBeenCalledWith("❌ Simulated API failure");
    });
  });

  describe("when API_DELAY is set to 1000 (1 second)", () => {
    let setTimeoutSpy: any;
    beforeEach(() => {
      process.env.API_DELAY = "1000"; // 1 second delay
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

    it("adds a delay using setTimeout for 1000ms", async () => {
      await apiErrorAndDelaySimulator(mockReq, mockRes, mockNext);

      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 1000);

      expect(mockNext).toHaveBeenCalledOnce();
    });
  });
});
