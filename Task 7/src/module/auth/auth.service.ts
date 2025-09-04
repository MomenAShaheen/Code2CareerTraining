import { CustomError } from "../../shard/utils/errors.util";
import { removeFields } from "../../shard/utils/object.util";
import { HttpErrorStatus } from "../../shard/utils/types.util";
import { zodValidation } from "../../shard/utils/zod.util";
import { User } from "../users/users.entity";
import { userService } from "../users/users.service";
import {
  LoginDTO,
  LoginResponseDTO,
  RegisterDTO,
  RegisterResponseDTO,
} from "./auth.dto";
import { argonHash, argonVerify } from "./utils/argon.util";
import { LoginDTOSchema } from "./utils/auth.schema";
import { singJWT } from "./utils/jwt.util";

class AuthService {
  private service = userService;

  login = async (payload: LoginDTO): Promise<LoginResponseDTO | undefined> => {
    const user = await this.service.getUserByEmail(payload.email);

    if (!user) {
      return undefined;
    }
    const isVerifyed = await argonVerify(payload.password, user.password);
    if (!isVerifyed) {
      return undefined;
    }
    const token = singJWT({ sub: user.id, name: user.name, role: user.role });
    return {
      user: removeFields(user, ["password"]),
      token: token,
    };
  };

  register = async (
    payload: RegisterDTO
  ): Promise<RegisterResponseDTO | undefined> => {
    const isExist = await this.service.getUserByEmail(payload.email);
    console.log(isExist);
    if (!!isExist) {
      return undefined;
    }

    const pass = await argonHash(payload.password);
    const user = await this.service.createUser(
      payload.name,
      payload.email,
      pass
    );

    const userWithOutPassword = removeFields(user, ["password"]);
    return userWithOutPassword;
  };
}

export const authService = new AuthService();
