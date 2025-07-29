const healthCheckHandler = (_req: Request, res: any) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
};

export default healthCheckHandler;
