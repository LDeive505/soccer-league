import * as jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import ApiError from '../errors/ApiError';
import { userPayload } from '../types/UserTypes';

const authorizationRole: RequestHandler = (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) throw new ApiError('Token not found', 401);

  const payload = jwt.verify(authorization, process.env.JWT_SECRET as string) as userPayload;
  return res.status(200).json({ role: payload.role });
};

export default authorizationRole;
