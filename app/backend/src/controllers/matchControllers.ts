import { RequestHandler } from 'express';
import MatchServices from '../services/matchServices';

export default class userControllers {
  constructor(private matchServices: MatchServices) {}

  public getAllMatches: RequestHandler = async (_req, res) => {
    const matches = await this.matchServices.getAll();
    return res.status(200).json(matches);
  };

  public getMatchesByQuery: RequestHandler = async (req, res) => {
    const onGoing = req.query.Inprogress === 'true';
    const matches = await this.matchServices.getByQuery(onGoing);
    return res.status(200).json(matches);
  };
}
