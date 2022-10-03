import { RequestHandler } from 'express';
import TeamServices from '../services/teamServices';

export default class userControllers {
  constructor(private teamServices: TeamServices) {}

  public getAllTeams: RequestHandler = async (_req, res) => {
    const teams = await this.teamServices.getAll();
    return res.status(200).json(teams);
  };

  public getTeamById: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const team = await this.teamServices.getById(id);
    return res.status(200).json(team);
  };
}
