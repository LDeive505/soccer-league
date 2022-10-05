import { RequestHandler } from 'express';
import LeaderboardServices from '../services/LeaderboardServices';

export default class LeaderBoardControllers {
  constructor(private leaderboardService: LeaderboardServices) {}

  public getAllLeaderboards: RequestHandler = async (_req, res) => {
    const teams = await this.leaderboardService.getAll();
    return res.status(200).json(teams);
  };
}
