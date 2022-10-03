import { Router } from 'express';
import TeamServices from '../services/teamServices';
import TeamControllers from '../controllers/teamControllers';
import Team from '../database/models/Team';

const router = Router();

const teamControllers = new TeamControllers(new TeamServices(Team));

router.get('/', teamControllers.getAllTeams);
router.get('/:id', teamControllers.getTeamById);

export default router;
