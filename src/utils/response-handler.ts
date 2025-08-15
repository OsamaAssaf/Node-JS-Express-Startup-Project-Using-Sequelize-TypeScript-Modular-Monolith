import { Response } from "express";

export const successResponse = (
  res: Response,
  message = "Success",
  statusCode = 200,
  data = null,
) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};

export const errorResponse = (
  res: Response,
  message = "An error occurred",
  statusCode = 500,
  data = null,
) => {
  return res.status(statusCode).json({
    status: "failed",
    message,
    data,
  });
};
