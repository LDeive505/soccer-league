import { RequestHandler } from 'express';
import MatchServices from '../services/matchServices';

export default class userControllers {
  constructor(private matchServices: MatchServices) {}

  public getMatches: RequestHandler = async (req, res) => {
    const { inProgress } = req.query;
    const matches = await this.matchServices.getMatches(inProgress as string);
    return res.status(200).json(matches);
  };
}
