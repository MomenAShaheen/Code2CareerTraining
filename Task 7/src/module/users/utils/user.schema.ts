import { z, ZodType } from "zod";
import { User } from "../users.entity";
import { createChochDTO, updateUserDTO } from "../users.dto";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["ADMIN", "COACH", "STUDENT"]),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies ZodType<User>;

export const UpdateUserSchema = UserSchema.pick({
  email: true,
  name: true,
  password: true,
}).partial() satisfies ZodType<updateUserDTO>;

export const createChochSchema = UserSchema.pick({
  email: true,
  name: true,
  password: true,
}) satisfies ZodType<createChochDTO>;
