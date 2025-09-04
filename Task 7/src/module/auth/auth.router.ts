import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();
const authController = new AuthController();

// router.get("/", (req, res) => {
//   res.json({
//     message: "hello",
//   });
// });

router.post("/register", authController.register);
router.post("/login", authController.login);

export const authRouter = router;
