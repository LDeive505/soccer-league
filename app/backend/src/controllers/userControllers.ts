import { RequestHandler } from 'express';
import UserServices from '../services/userServices';

export default class userControllers {
  constructor(private userServices: UserServices) {}

  public login: RequestHandler = async (req, res) => {
    const token = await this.userServices.login(req.body);
    return res.status(200).json({ token });
  };
}
