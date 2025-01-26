export const globalErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "An unexpected error occurred";
  let data = err.data || null;

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation error";
    data = err.errors;
  } else if (err.name === "JsonWebTokenError") {
    statusCode = 403;
    message = "Invalid token";
  } else if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token has expired. Please log in again.";
  } else if (err.code === 11000) {
    statusCode = 409;
    message = "Duplicate key error";
    data = err.keyValue;
  }

  console.error("Error handled by global handler:", err);

  return res.status(statusCode).json({ status: false, message, data });
};
