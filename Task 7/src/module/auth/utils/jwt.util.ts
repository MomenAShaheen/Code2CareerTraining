import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { Request } from "express";
import { userRoles } from "../../users/users.entity";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../../../config/env.config";
// sing

type JWT_PAYLOAD = { sub: string; name: string; role: userRoles };
//getEnvOrThrow('JWT_SECRET');
const secret = JWT_SECRET;
const expiresIn = JWT_EXPIRES_IN;
export const singJWT = (payload: JWT_PAYLOAD, options?: SignOptions) => {
  return jwt.sign(payload, secret, {
    expiresIn: expiresIn as jwt.SignOptions["expiresIn"],
  });
};

export const verifyJWT = (token: string): JWT_PAYLOAD => {
  return jwt.verify(token, JWT_SECRET) as JWT_PAYLOAD;
};

export const getToken = (req: Request) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7); // Remove 'Bearer ' prefix
  }
  return null;
};
