import { RequestHandler } from 'express';
import MatchServices from '../services/matchServices';

export default class userControllers {
  constructor(private matchServices: MatchServices) {}

  public getAllMatches: RequestHandler = async (_req, res) => {
    const teams = await this.matchServices.getAll();
    return res.status(200).json(teams);
  };
}
