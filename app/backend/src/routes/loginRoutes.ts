import { Router } from 'express';
import UserControllers from '../controllers/userControllers';
import UserServices from '../services/userServices';
import loginValidation from '../middlewares/loginValidation';
import tokenValidator from '../middlewares/tokenValidator';
import User from '../database/models/User';

const router = Router();

const userControllers = new UserControllers(new UserServices(User));

router.post('/', loginValidation, userControllers.login);
router.get('/validate', tokenValidator);

export default router;
