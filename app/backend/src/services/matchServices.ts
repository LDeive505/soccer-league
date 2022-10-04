import ApiError from '../errors/ApiError';
import { Match } from '../types/Match';
import MatchModel from '../database/models/Match';
import Team from '../database/models/Team';

export default class TeamServices {
  constructor(private matchModel: typeof MatchModel) {}

  public async getAll(): Promise<Match[]> {
    const matches = await this.matchModel.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }] });

    if (!matches) throw new ApiError('No matches found', 404);
    return matches;
  }

  public async getByQuery(onGoing: boolean): Promise<Match[]> {
    const matches = await this.matchModel.findAll({
      where: { inProgress: onGoing },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }] });

    if (!matches) throw new ApiError('No matches found', 404);
    return matches;
  }

  public async getMatches(onGoing: string | undefined): Promise<Match[]> {
    if (onGoing) {
      const matches = await this.getByQuery(onGoing === 'true');
      return matches;
    }
    const matches = await this.getAll();
    return matches;
  }
}
