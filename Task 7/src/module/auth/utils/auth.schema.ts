import { ZodType } from "zod";
import { UserSchema } from "../../users/utils/user.schema";
import { LoginDTO, RegisterDTO, RegisterResponseDTO } from "../auth.dto";

export const RegisterDTOSchema = UserSchema.pick({
  email: true,
  name: true,
  password: true,
}) satisfies ZodType<RegisterDTO>;

export const LoginDTOSchema = UserSchema.pick({
  email: true,
  password: true,
}) satisfies ZodType<LoginDTO>;
