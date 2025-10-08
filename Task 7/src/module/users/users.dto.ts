import { IUser } from "./users.entity";

export type usersMeResponseDTO = Omit<IUser, "password">;

export type updateUserDTO = Partial<Pick<IUser, "email" | "name" | "password">>;

export type createChochDTO = Pick<IUser, "email" | "name" | "password">;

export type createChochResponseDTO = Omit<IUser, "password">;
