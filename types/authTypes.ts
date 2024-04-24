export type RegisterBody = {
  username: string;
  email: string;
  password: string;
};
export type LoginBody = {
  email: string;
  password: string;
};
export type LoginReturnBody = {
  // email: string;
  token: string;
  is_verified?: boolean;
  // user_id: number;
  // username: string;
};

export type AuthData = {
  token: string | null;
  isVerified: boolean;
  email: string | null;
  setupProfile: boolean;
//   username: string | null;
};
