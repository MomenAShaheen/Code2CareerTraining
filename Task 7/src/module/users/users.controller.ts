import { Request, Response } from "express";
import { userService } from "./users.service";
import {
  createChochDTO,
  createChochResponseDTO,
  updateUserDTO,
} from "./users.dto";
import { zodValidation } from "../../shard/utils/zod.util";
import { createChochSchema, UpdateUserSchema } from "./utils/user.schema";
import { HttpErrorStatus } from "../../shard/utils/types.util";
import { CustomError } from "../../shard/utils/errors.util";
import { argonHash } from "../auth/utils/argon.util";
import { removeFields } from "../../shard/utils/object.util";

export class UserController {
  private service = userService;

  getUser = (req: Request, res: Response) => {
    let id = req.userID ? req.userID : "0";
    console.log(id);
    const user = this.service.getUser(id);
    console.log(user);
    res.apiSuccess("User Information", user, 200);
  };

  updateUser = async (req: Request<{}, {}, updateUserDTO>, res: Response) => {
    const verfiedPayload = await zodValidation(
      UpdateUserSchema,
      req.body,
      "USER"
    );

    const user = await this.service.updateUser(req.userID!, verfiedPayload);
    if (!user) {
      throw new CustomError("Existing User", "AUTH", HttpErrorStatus.Conflict);
    }
    res.apiSuccess("Updated successfully", user, 200);
  };

  createCouch = async (req: Request<{}, {}, createChochDTO>, res: Response) => {
    const verfiedPayload = await zodValidation(
      createChochSchema,
      req.body,
      "USER"
    );
    console.log("payload verfied");
    const isExist = await this.service.getUserByEmail(verfiedPayload.email);
    console.log(isExist);
    if (!!isExist) {
      throw new CustomError("Existing User", "USER", HttpErrorStatus.Conflict);
    }

    const pass = await argonHash(verfiedPayload.password);
    const user = await this.service.createUser(
      verfiedPayload.name,
      verfiedPayload.email,
      pass,
      "COACH"
    );

    const userWithOutPassword = removeFields(user, ["password"]);
    res.apiSuccess("Coach created", userWithOutPassword, 200);
  };
}
