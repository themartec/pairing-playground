import { NextFunction, Request, Response } from "express";

const apiErrorAndDelaySimulator = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (process.env.API_FAILURE_RATE) {
    const failureRate = parseFloat(process.env.API_FAILURE_RATE);

    if (failureRate > 0 && Math.random() < failureRate) {
      // NOTE: helpful for API failure simulation
      // eslint-disable-next-line no-console
      console.log("❌ Simulated API failure");
      return res.status(500).json({
        error: "Service temporarily unavailable",
        code: "SERVICE_UNSTABLE",
        retryAfter: 2000,
        message: "Our servers are experiencing high load. Please try again.",
      });
    }
  }
  if (process.env.API_DELAY) {
    const apiDelay = parseInt(process.env.API_DELAY, 10);
    await new Promise((resolve) => {
      setTimeout(resolve, apiDelay);
    });
  }
  return next();
};

export default apiErrorAndDelaySimulator;
