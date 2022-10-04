import { RequestHandler } from 'express';
import MatchServices from '../services/matchServices';

export default class userControllers {
  constructor(private matchServices: MatchServices) {}

  public createMatch: RequestHandler = async (req, res) => {
    const createdMatch = await this.matchServices.create(req.body);
    res.status(201).json(createdMatch);
  };

  public getMatches: RequestHandler = async (req, res) => {
    const { inProgress } = req.query;
    const matches = await this.matchServices.getMatches(inProgress as string);
    return res.status(200).json(matches);
  };

  public updateMatch: RequestHandler = async (req, res) => {
    const { id } = req.params;
    await this.matchServices.update(id);
    return res.status(200).json({ message: 'Finished' });
  };
}
