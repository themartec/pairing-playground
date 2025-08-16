const dataSubmitHandler = async (req: any, res: any) => {
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
  });
};

export default dataSubmitHandler;
