import { ErrorRequestHandler } from 'express';
import ApiError from '../errors/ApiError';

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
