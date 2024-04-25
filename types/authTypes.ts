export type RegisterBody = {
  username: string;
  email: string;
  password: string;
};
export type RegisterRequestBody = {
  username: string;
  email: string;
  password: string;
  conf_pass: string;
};

export type LoginBody = {
  email: string;
  password: string;
};
export type LoginResponse = {
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
