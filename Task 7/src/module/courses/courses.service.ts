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

  getCourse(id: string): Course | null {
    const course = this.repository.getCourse(id);
    console.log(course);
    if (!course) {
      return null;
    }
    return course;
  }

  getUserCourses(
    creatorID: string
  ): Promise<getCoursesResponseDTO | undefined> {
    return this.repository.getCourses(creatorID);
  }

  getAllCourses(): getAllCourseResponseDTO {
    return this.repository.getAll();
  }

  async createCourse(
    creatorID: string,
    title: string,
    description: string,
    image?: string
  ) {
    const course: Course = {
      id: "0",
      title: title,
      description: description,
      image: image,
      creatorID: creatorID,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.repository.createCourse(course);
  }

  async updateCourse(id: string, course: updateCourseDTO) {
    // const tcourse = { ...course, updatedAt: new Date() };
    return this.repository.update(id, course);
  }

  async deleteCourse(id: string) {
    return this.repository.deleteCourse(id);
  }
}

export const courseService = new CourseSerive();
