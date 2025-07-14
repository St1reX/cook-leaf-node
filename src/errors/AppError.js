import { errorTypes } from "./errorTypes.js";

export default class AppError extends Error {
  constructor(message, statusCode, type, details = null, isOperational = false) {
    super(message);
    this.statusCode = statusCode || 500;
    this.type = type || errorTypes.INTERNAL;
    this.details = details || "";
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}
