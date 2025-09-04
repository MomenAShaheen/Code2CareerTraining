import { User } from "../users/users.entity";

export type LoginDTO = {
  email: string;
  password: string;
};

export type LoginResponseDTO = {
  user: Omit<User, "password">;
  token: string;
};

export type RegisterDTO = Pick<User, "email" | "name" | "password">;

export type RegisterResponseDTO = Omit<User, "password">;
