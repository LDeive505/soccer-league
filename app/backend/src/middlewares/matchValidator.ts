import { RequestHandler } from 'express';
import ApiError from '../errors/ApiError';

const matchValidator: RequestHandler = (req, res, next) => {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam === awayTeam) {
    throw new ApiError('It is not possible to create a match with two equal teams', 401);
  }

  next();
};

export default matchValidator;
