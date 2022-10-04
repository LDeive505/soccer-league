import { Router } from 'express';
import MatchServices from '../services/matchServices';
import MatchControllers from '../controllers/matchControllers';
import Match from '../database/models/Match';

const router = Router();

const matchControllers = new MatchControllers(new MatchServices(Match));

router.get('/', matchControllers.getMatches);

export default router;
