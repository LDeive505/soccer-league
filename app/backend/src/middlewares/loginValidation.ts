import { RequestHandler } from 'express';
import ApiError from '../errors/ApiError';

const loginValidation: RequestHandler = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError('All fields must be filled', 400);
  next();
};

export default loginValidation;
