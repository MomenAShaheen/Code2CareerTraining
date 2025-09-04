import { Response } from "express";
import { HttpErrorStatus, ModuleNameType } from "./types.util";
import { ZodError } from "zod";

export class CustomError extends Error {
  public errorType = "custom";
  constructor(
    msg: string,
    public moduleName: ModuleNameType,
    public statusCode: HttpErrorStatus
  ) {
    super(msg);
  }
}

export const handleError = (error: unknown, res: Response) => {
  if (error instanceof CustomError) {
    console.log("customError", error);
    res.apiError(error.message, error.statusCode, error.moduleName);
    return;
  }
  console.log(`internal server error`, error);
  //   we should alert ourself
  res.status(500).send("internal server");
};
