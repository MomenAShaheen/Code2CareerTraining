import express, { Request, Response, NextFunction } from "express";

import { userRouter } from "./module/users/users.router";
import { authRouter } from "./module/auth/auth.router";
import { CustomError, handleError } from "./shard/utils/errors.util";
import { responseMiddleware } from "./middlewares/responseMiddleware";
import { courseRouter } from "./module/courses/courses.router";

import { PORT, JWT_SECRET, isProduction } from "./config/env.config";
import { error } from "node:console";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(responseMiddleware);

// app.use((req:Request, res:Response, next:NextFunction) => {
//     console.log("first middle ware is running ...");
//     res.setHeader('cache-control', 'public max-age=3600');
//     next();
// })

// app.use((req:Request, res:Response, next:NextFunction) => {
//     console.log("second middle ware is running ...");
//     res.send('Hello');
// })

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/course", courseRouter);
// const userController = new UserController();
// app.get("/:id", userController.getUser);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    handleError(err, res);
    return;
  }
  console.log(err);
  res.apiError("internal server error", 500, "General");
});

app.use((req, res) => {
  res.status(404).json({
    success: "false",
    message: "Route not found",
  });
});
//const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${isProduction ? "Production" : "Development"}`);
  console.log(`🔑 JWT Secret loaded: ${JWT_SECRET ? "Yes" : "No"}`);
});
