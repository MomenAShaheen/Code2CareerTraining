import { Router } from "express";
import { UserController } from "./users.controller";
import { isAuthonticated, isAuthorized } from "../../middlewares/authorization";

const router = Router();
const userController = new UserController();

router.use(isAuthonticated);

router.get("/me", userController.getUser);
router.put("/me", userController.updateUser);
router.post("/coach", isAuthorized(["ADMIN"]), userController.createCouch);

export const userRouter = router;
