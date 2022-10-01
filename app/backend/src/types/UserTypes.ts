export type User = {
  id?: number;
  username: string;
  role: string;
  email: string;
  password: string;
};

export type Login = {
  email: string,
  password: string,
};

export type LoginToken = string;

export type userPayload = {
  role: string,
  email: string,
};
