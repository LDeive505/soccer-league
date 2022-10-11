
import { tokenGenerator } from '../../helpers/jwtHelpers';

export const loginMock = { email: 'user@user.com', password: 'secret_user' };
export const invalidLoginMock = { email: 'zyzz@email', password: '123456' };
// export const token = tokenGenerator(loginMock);