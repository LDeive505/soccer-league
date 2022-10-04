import ApiError from '../errors/ApiError';
import { Match } from '../types/Match';
import MatchModel from '../database/models/Match';
import Team from '../database/models/Team';

export default class TeamServices {
  constructor(private matchModel: typeof MatchModel) {}

  public async create(match: Match): Promise<Match> {
    const { homeTeam: homeId, awayTeam: awayId } = match;
    const homeTeam = await Team.findByPk(homeId);
    const awayTeam = await Team.findByPk(awayId);
    if (!homeTeam || !awayTeam) throw new ApiError('There is no team with such id!', 404);

    const matchCreated = await this.matchModel.create(match);
    return matchCreated;
  }

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

  public async update(id: string): Promise<boolean> {
    const match = await this.matchModel.findByPk(id);
    if (!match) throw new ApiError('Match not found', 404);

    const updatedMatch = await this.matchModel.update({ inProgress: false }, { where: { id } });
    console.log(updatedMatch);
    return true;
  }
}
