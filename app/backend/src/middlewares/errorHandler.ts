import { ErrorRequestHandler } from 'express';
import CustomError from '../errors/CustomError';

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof CustomError) {
    return res.status(error.status).json({ message: error.message });
  }
  return res.status(500).json({ message: error.message });
};

export default errorHandler;