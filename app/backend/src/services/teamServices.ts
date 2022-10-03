import ApiError from '../errors/ApiError';
import { Team } from '../types/Team';
import TeamModel from '../database/models/Team';

export default class TeamServices {
  constructor(private userModel: typeof TeamModel) {}

  public async getAll(): Promise<Team[]> {
    const teams = await this.userModel.findAll();
    return teams;
  }

  public async getById(id: string): Promise<Team> {
    const team = await this.userModel.findByPk(id);
    if (!team) throw new ApiError('Team not found', 404);
    return team;
  }
}
