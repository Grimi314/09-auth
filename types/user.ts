export type RegisterRequest = {
  email: string;
  password: string;
};

export type User = {
  email: string;
  username: string;
  avatar: string;
};

export type UserUpdate = {
  username: string;
};