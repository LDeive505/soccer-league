import * as bcrypt from 'bcryptjs';
import { Login, LoginToken } from '../types/UserTypes';
import User from '../database/models/User';
import { tokenGenerator } from '../helpers/jwtHelpers';

export default class UserServices {
  constructor(private userModel: typeof User) {}

  public async login(login: Login): Promise<LoginToken | null> {
    const { email, password } = login;
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) return null;

    const encripted = user.password;
    const validPassword = await bcrypt.compare(password, encripted);
    if (!validPassword) return null;

    const token = tokenGenerator({ email, id: user.id });
    return token as LoginToken;
  }
}
