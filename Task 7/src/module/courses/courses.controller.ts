import { Request, Response } from "express";
import { courseService } from "./courses.service";
import { CustomError } from "../../shard/utils/errors.util";
import { HttpErrorStatus } from "../../shard/utils/types.util";
import { createCourseDTO, updateCourseDTO } from "./courses.dto";
import { idParamSchema, zodValidation } from "../../shard/utils/zod.util";
import { CreateCourseSchema, UpdateCourseSchema } from "./courses.schema";

export class CourseController {
  private service = courseService;

  getCourse = (req: Request, res: Response) => {
    let ids = req.params.id;
    if (!ids) {
      throw new CustomError(
        "Please provide course id",
        "COURSE",
        HttpErrorStatus.Conflict
      );
    }

    const id = parseInt(ids);
    const course = this.service.getCourse(id);
    console.log(course);
    res.apiSuccess("Course Information", course, 200);
  };

  getMyCourses = (req: Request, res: Response) => {
    let id = req.userID ? req.userID : "0";
    console.log(id);
    const idi = parseInt(id);
    const courses = this.service.getUserCourses(idi);
    console.log(courses);
    res.apiSuccess("Courses Information", courses, 200);
  };

  getAllCourses = (req: Request, res: Response) => {
    const courses = this.service.getAllCourses();
    console.log(courses);
    res.apiSuccess("Courses Information", courses, 200);
  };

  createCourse = async (
    req: Request<{}, {}, createCourseDTO>,
    res: Response
  ) => {
    const verfiedPayload = await zodValidation(
      CreateCourseSchema,
      req.body,
      "COURSE"
    );

    const course = await this.service.createCourse(
      req.userID ? parseInt(req.userID) : 0,
      verfiedPayload.title,
      verfiedPayload.description,
      req.file?.path
    );
    console.log(course);

    if (!course) {
      throw new CustomError(
        "Error in creating course",
        "COURSE",
        HttpErrorStatus.NotFound
      );
    }

    res.apiSuccess("Updated successfully", course, 200);
  };

  updateCourse = async (
    req: Request<{ id: string }, {}, updateCourseDTO>,
    res: Response
  ) => {
    const verfiedID = await zodValidation(idParamSchema, req.params, "COURSE");

    const verfiedPayload = await zodValidation(
      UpdateCourseSchema,
      req.body,
      "COURSE"
    );

    const checkCourse = await this.service.getCourse(parseInt(verfiedID.id));

    if (!(checkCourse?.creatorID === req.userID || req.userRole === "ADMIN")) {
      throw new CustomError(
        "You are unauthorized to update this course",
        "COURSE",
        HttpErrorStatus.Unauthorized
      );
    }
    verfiedPayload.image = req.file?.path;
    const course = await this.service.updateCourse(
      parseInt(verfiedID.id),
      verfiedPayload
    );
    if (!course) {
      throw new CustomError(
        "there is no course to update ",
        "COURSE",
        HttpErrorStatus.NotFound
      );
    }
    res.apiSuccess("Updated successfully", course, 200);
  };

  deleteCourse = async (
    req: Request<{ id: string }, {}, {}>,
    res: Response
  ) => {
    const verfiedIDs = await zodValidation(idParamSchema, req.params, "COURSE");
    const verfiedID = parseInt(verfiedIDs.id);
    // if (!id) {
    //   throw new CustomError(
    //     "Please provide course id",
    //     "COURSE",
    //     HttpErrorStatus.Conflict
    //   );
    // }

    console.log(verfiedID);
    const checkCourse = await this.service.getCourse(verfiedID);

    if (!(checkCourse?.creatorID === req.userID || req.userRole === "ADMIN")) {
      throw new CustomError(
        "You are unauthorized to update this course",
        "COURSE",
        HttpErrorStatus.Unauthorized
      );
    }

    const isDeleted = await this.service.deleteCourse(verfiedID);
    if (isDeleted) {
      res.apiEmpty("Deleted Successfully", 200);
    } else {
      throw new CustomError(
        "Error in deleting",
        "COURSE",
        HttpErrorStatus.NotImplemented
      );
    }
  };
}
