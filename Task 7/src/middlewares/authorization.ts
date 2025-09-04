import { Request, Response, NextFunction } from "express";
import { getToken, verifyJWT } from "../module/auth/utils/jwt.util";
import { CustomError } from "../shard/utils/errors.util";
import { HttpErrorStatus } from "../shard/utils/types.util";
import { userRoles } from "../module/users/users.entity";

declare global {
  namespace Express {
    interface Request {
      userID?: string | null;
      userRole?: userRoles;
    }
  }
}

export const isAuthonticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = getToken(req);

    if (!token) {
      throw new CustomError(
        "You need to login",
        "AUTH",
        HttpErrorStatus.Unauthorized
      );
    }

    const decoded = verifyJWT(token);
    req.userID = decoded.sub;
    req.userRole = decoded.role!;

    next();
  } catch (error) {
    throw new CustomError(
      "You need to login",
      "AUTH",
      HttpErrorStatus.Unauthorized
    );
  }
};

export const isAuthorized = (role: userRoles[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = getToken(req);

      console.log("token : ", token);
      if (!token) {
        throw new CustomError(
          "You need to login",
          "AUTH",
          HttpErrorStatus.Unauthorized
        );
      }

      const decoded = verifyJWT(token);
      req.userID = decoded.sub;
      req.userRole = decoded.role;

      // role.forEach((tRole) => {
      //   if (req.userRole === tRole) {
      //     console.log("role : ", tRole);
      //     break;
      //   } else {
      //     throw new CustomError(
      //       "You are not authorized",
      //       "AUTH",
      //       HttpErrorStatus.Unauthorized
      //     );
      //   }
      // });

      const isAuthorised = role.find((item) => item === decoded.role);
      if (!isAuthorised) {
        throw new CustomError(
          "You are not authorized",
          "AUTH",
          HttpErrorStatus.Unauthorized
        );
      }

      next();
    } catch (error) {
      throw new CustomError(
        "You need to login",
        "AUTH",
        HttpErrorStatus.Unauthorized
      );
    }
  };
};
