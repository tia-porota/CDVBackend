import express  from "express";
export const errorHandler = (
  err: any,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) => {
  const statusCode: number = err.statusCode || 500;
  const errorResponse = {
    error: {
      message: err.message || "Error interno del servidor",
      code: err.code || "internal_error",
    },
  };
  res.status(statusCode).json(errorResponse);
};
