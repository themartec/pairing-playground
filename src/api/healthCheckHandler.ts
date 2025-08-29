import { Request, Response } from "express";
type HealthCheckData = {
  status: string;
  timestamp: string;
};
const healthCheckHandler = (_req: Request, res: Response<HealthCheckData>) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
};

export default healthCheckHandler;
