import { RequestHandler } from 'express';
import ApiError from '../errors/ApiError';
import { validator } from '../helpers/jwtHelpers';

const tokenValidator: RequestHandler = (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw new ApiError('Token not found', 401);

  try {
    validator(authorization);
    next();
  } catch (error) {
    throw new ApiError('Token must be a valid token', 401);
  }
};

export default tokenValidator;
