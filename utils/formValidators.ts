import { emailRegex, passwordRegex } from "./regexes";

export const strenghtPasswordValidator = (password: string): boolean => {
  return passwordRegex.test(password);
};

export const samePasswordValidator = (
  firstPass: string,
  secondPass: string
) => {
  return firstPass !== secondPass;
};

export const emailValidator = (email: string) => {
  return emailRegex.test(email);
};