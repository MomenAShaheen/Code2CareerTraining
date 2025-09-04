import { Router } from "express";
import { CourseController } from "./courses.controller";
import { isAuthonticated, isAuthorized } from "../../middlewares/authorization";
import { uploadSingle } from "../../config/multer.config";

const router = Router();
const courseController = new CourseController();

router.use(isAuthonticated);

router.get("/", courseController.getAllCourses);
router.post(
  "/",
  isAuthorized(["ADMIN", "COACH"]),
  uploadSingle("image"),
  courseController.createCourse
);
router.get("/:id", courseController.getCourse);
router.put(
  "/:id",
  isAuthorized(["ADMIN", "COACH"]),
  uploadSingle("image"),
  courseController.updateCourse
);

router.delete(
  "/:id",
  isAuthorized(["ADMIN", "COACH"]),
  courseController.deleteCourse
);

export const courseRouter = router;
