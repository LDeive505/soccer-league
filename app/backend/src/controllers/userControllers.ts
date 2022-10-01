import { RequestHandler } from 'express';
import UserServices from '../services/userServices';

export default class userControllers {
  constructor(private userServices: UserServices) {}

  public login: RequestHandler = async (req, res) => {
    const token = await this.userServices.login(req.body);
    if (!token) return res.status(401).json({ message: 'Incorrect email or password' });
    return res.status(200).json({ token });
  };
}
