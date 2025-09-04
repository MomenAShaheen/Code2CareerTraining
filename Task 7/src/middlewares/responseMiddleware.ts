// middleware/responseMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { ResponseBuilder } from "../shard/utils/responsebuilder.util";

declare global {
  namespace Express {
    interface Response {
      apiSuccess: <T>(message: string, data: T, code?: number) => Response;
      apiOk: <T>(data: T, message?: string) => Response;
      apiEmpty: (message?: string, code?: number) => Response;
      apiPaginated: <T>(
        data: T[],
        pagination: any,
        message?: string
      ) => Response;
      apiError: (message: string, code?: number, error?: string) => Response;
    }
  }
}

export const responseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Success response with data
  res.apiSuccess = function <T>(message: string, data: T, code: number = 200) {
    const response = ResponseBuilder.success(message, data, code);
    return this.status(code).json(response);
  };

  // OK response (simplified success)
  res.apiOk = function <T>(data: T, message: string = "Operation successful") {
    const response = ResponseBuilder.ok(data, message);
    return this.status(200).json(response);
  };

  // Empty response (for success without data)
  res.apiEmpty = function (
    message: string = "Operation successful",
    code: number = 200
  ) {
    const response = ResponseBuilder.empty(message, code);
    return this.status(code).json(response);
  };

  // Paginated response
  res.apiPaginated = function <T>(
    data: T[],
    pagination: any,
    message: string = "Data retrieved successfully"
  ) {
    const response = ResponseBuilder.paginated(data, pagination, message);
    return this.status(200).json(response);
  };

  // Error response
  res.apiError = function (
    message: string,
    code: number = 500,
    error?: string
  ) {
    const response = ResponseBuilder.error(message, code, error);
    return this.status(code).json(response);
  };

  next();
};
