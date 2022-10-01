import * as jwt from 'jsonwebtoken';
import { userPayload, LoginToken } from '../types/UserTypes';

const secret = process.env.JWT_SECRET || 'theAnswerIs42';

export const tokenGenerator = (payload: userPayload): LoginToken => {
  const token = jwt.sign(payload, secret, { expiresIn: '1d', algorithm: 'HS256' });
  return token as LoginToken;
};

export const tokenValidator = (): void => {
};
