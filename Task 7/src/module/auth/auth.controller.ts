import { Request, Response } from "express";
import { LoginDTO, RegisterDTO } from "./auth.dto";
import { authService } from "./auth.service";
import { LoginDTOSchema, RegisterDTOSchema } from "./utils/auth.schema";
import { zodValidation } from "../../shard/utils/zod.util";
import { CustomError } from "../../shard/utils/errors.util";
import { HttpErrorStatus } from "../../shard/utils/types.util";

export class AuthController {
  private service = authService;

  login = async (req: Request<{}, {}, LoginDTO>, res: Response) => {
    const parsedPayload = zodValidation(LoginDTOSchema, req.body, "AUTH");
    const user = await this.service.login(parsedPayload);
    if (!user) {
      throw new CustomError(
        "the email or paawssord provided is not right",
        "AUTH",
        HttpErrorStatus.NotFound
      );
    }

    res.status(200).apiSuccess("Login successfully", user);
  };

  register = async (req: Request<{}, {}, RegisterDTO>, res: Response) => {
    const verfiedPayload = await zodValidation(
      RegisterDTOSchema,
      req.body,
      "AUTH"
    );
    const user = await this.service.register(verfiedPayload);
    if (!user) {
      throw new CustomError("Existing User", "AUTH", HttpErrorStatus.Conflict);
    }
    res.apiSuccess("created successfully", user, 200);
  };
}
