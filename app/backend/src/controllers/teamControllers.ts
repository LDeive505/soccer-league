import { RequestHandler } from 'express';
import TeamServices from '../services/teamServices';

export default class userControllers {
  constructor(private teamServices: TeamServices) {}

  public getAllTeams: RequestHandler = async (req, res) => {
    const teams = await this.teamServices.getAll();
    return res.status(200).json(teams);
  };
}
