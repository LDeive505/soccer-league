import * as bcrypt from 'bcryptjs';
import { Login, LoginToken } from '../types/UserTypes';
import User from '../database/models/User';
import { tokenGenerator } from '../helpers/jwtHelpers';
import ApiError from '../errors/ApiError';

export default class UserServices {
  constructor(private userModel: typeof User) {}

  public async login(login: Login): Promise<LoginToken> {
    const { email, password } = login;
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) throw new ApiError('Incorrect email or password', 401);

    const encripted = user.password;
    const validPassword = await bcrypt.compare(password, encripted);
    if (!validPassword) throw new ApiError('Incorrect email or password', 401);

    const token = tokenGenerator({ email, id: user.id });
    return token as LoginToken;
  }
}
