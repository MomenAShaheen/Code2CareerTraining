import * as argon2 from "argon2";

export const argonHash = (value: string) => {
  return argon2.hash(value);
};

export const argonVerify = (value: string, hash: string) => {
  return argon2.verify(hash, value);
};
