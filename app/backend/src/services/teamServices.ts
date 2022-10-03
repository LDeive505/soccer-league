// import ApiError from '../errors/ApiError';
import { Team } from '../types/Team';
import TeamModel from '../database/models/Team';

export default class TeamServices {
  constructor(private userModel: typeof TeamModel) {}

  public async getAll(): Promise<Team[]> {
    const teams = await this.userModel.findAll();
    return teams;
  }
}
