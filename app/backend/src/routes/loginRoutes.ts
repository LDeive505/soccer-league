import { Router } from 'express';
import UserControllers from '../controllers/userControllers';
import UserServices from '../services/userServices';
import User from '../database/models/User';

const router = Router();

const userControllers = new UserControllers(new UserServices(User));

router.post('/', userControllers.login);

export default router;
