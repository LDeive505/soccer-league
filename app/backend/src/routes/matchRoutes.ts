import { Router } from 'express';
import MatchServices from '../services/matchServices';
import MatchControllers from '../controllers/matchControllers';
import Match from '../database/models/Match';
import matchValidator from '../middlewares/matchValidator';
import tokenValidator from '../middlewares/tokenValidation';

const router = Router();

const matchControllers = new MatchControllers(new MatchServices(Match));

router.route('/')
  .get(matchControllers.getMatches)
  .post(tokenValidator, matchValidator, matchControllers.createMatch);

router.route('/:id/finish').patch(matchControllers.updateMatch);

export default router;
