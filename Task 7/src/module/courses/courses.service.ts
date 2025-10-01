import { Prisma } from "../../../generated/prisma";
import { removeFields } from "../../shard/utils/object.util";
import {
  getAllCourseResponseDTO,
  getCourseResponseDTO,
  getCoursesResponseDTO,
  updateCourseDTO,
} from "./courses.dto";
import { Course } from "./courses.entity";
import { CourseRepository } from "./courses.repository";

class CourseSerive {
  private repository = new CourseRepository();

  async getCourse(id: number) {
    const course = await this.repository.getCourse(id);
    console.log(course);
    if (!course) {
      return null;
    }
    return course;
  }

  getUserCourses(creatorID: number) {
    return this.repository.getCourses(creatorID);
  }

  getAllCourses(): getAllCourseResponseDTO {
    return this.repository.getAll();
  }

  async createCourse(
    creatorID: number,
    title: string,
    description: string,
    image?: string
  ) {
    const course: Prisma.CourseCreateInput = {
      title: title,
      description: description,
      image: image,
      createdAt: new Date(),
      updatedAt: new Date(),
      creator: { connect: { id: creatorID } },
    };
    return this.repository.createCourse(course);
  }

  async updateCourse(id: number, course: updateCourseDTO) {
    // const tcourse = { ...course, updatedAt: new Date() };
    return this.repository.update(id, course);
  }

  async deleteCourse(id: number) {
    return this.repository.deleteCourse(id);
  }
}

export const courseService = new CourseSerive();
