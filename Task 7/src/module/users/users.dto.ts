import { User } from "./users.entity";

export type usersMeResponseDTO = Omit<User, "password">;

export type updateUserDTO = Partial<Pick<User, "email" | "name" | "password">>;

export type createChochDTO = Pick<User, "email" | "name" | "password">;

export type createChochResponseDTO = Omit<User, "password">;
