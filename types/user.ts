export type RegisterRequest = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
 username?: string;
 avatar?: string;
  createdAt: Date;
  updatedAt: Date;
};


export type UserUpDate =
{ username: string }