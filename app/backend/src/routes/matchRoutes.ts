import { Router } from 'express';
import MatchServices from '../services/matchServices';
import MatchControllers from '../controllers/matchControllers';
import Match from '../database/models/Match';
import matchValidator from '../middlewares/matchValidator';

const router = Router();

const matchControllers = new MatchControllers(new MatchServices(Match));

router.route('/')
  .get(matchControllers.getMatches)
  .post(matchValidator, matchControllers.createMatch);

router.route('/:id/finish').patch(matchControllers.updateMatch);

export default router;
