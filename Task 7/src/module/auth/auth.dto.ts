import { IUser } from "../users/users.entity";

export type LoginDTO = {
  email: string;
  password: string;
};

export type LoginResponseDTO = {
  user: Omit<IUser, "password">;
  token: string;
};

export type RegisterDTO = Pick<IUser, "email" | "name" | "password">;

export type RegisterResponseDTO = Omit<IUser, "password">;
