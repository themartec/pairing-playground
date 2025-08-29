import { Request, Response } from "express";
type UserData = {
  success: boolean;
  message: string;
  submissionId: number;
  data: string;
  server: string;
};

const dataSubmitHandler = async (
  req: Request & { hostname: string },
  res: Response<UserData>,
) => {
  const submission = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    ...req.body,
  };

  res.json({
    success: true,
    message: "Form submitted successfully!",
    submissionId: submission.id,
    data: submission,
    server: req.hostname,
  });
};

export default dataSubmitHandler;
