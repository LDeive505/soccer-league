import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardControllers';
import LeaderboardService from '../services/leaderboardServices';
import Match from '../database/models/Match';

const leaderboardController = new LeaderboardController(new LeaderboardService(Match));

const router = Router();

router.route('/').get(leaderboardController.getLeaderboard);
router.route('/home').get(leaderboardController.getHomeLeaderboard);
router.route('/away').get(leaderboardController.getAwayLeaderboard);

export default router;
