import z, { ZodError, ZodType } from "zod";
import { HttpErrorStatus, ModuleNameType } from "./types.util";
import { CustomError } from "./errors.util";

export const idParamSchema = z.object({
  id: z.string("invalid ID"),
});

export const zodValidation = <T>(
  schema: ZodType<T>,
  payload: T,
  moduleName: ModuleNameType
) => {
  try {
    const safeData = schema.parse(payload);
    return safeData;
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("fromzod : ", getFieldErrors(error));
      throw new CustomError(
        error.issues.map((err) => err.message).toString(),
        moduleName,
        HttpErrorStatus.BadRequest
      );
    }

    throw error;
  }
};

function getFieldErrors(error: ZodError): Record<string, string[]> {
  const errors: Record<string, string[]> = {};

  error.issues.forEach((err) => {
    const field = err.path.join(".");
    if (!errors[field]) {
      errors[field] = [];
    }
    errors[field].push(err.message);
  });

  return errors;
}
