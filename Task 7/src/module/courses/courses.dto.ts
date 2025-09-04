import { Course } from "./courses.entity";

export type createCourseDTO = Pick<Course, "title" | "description" | "image">;

export type createCourseResponseDTO = Omit<Course, "creatorID" | "id">;

// export type updateCourseDTO = Pick<Course, "id"> &
//   Partial<Omit<Course, "creatorID" | "createdAt" | "updatedAt" | "id">>;

export type updateCourseDTO = Partial<
  Omit<Course, "creatorID" | "createdAt" | "updatedAt" | "id">
>;

export type updateCourseResponseDTO = Omit<Course, "creatorID">;

export type getCourseResponseDTO = Omit<Course, "creatorID">;
export type getCoursesResponseDTO = Omit<Course, "creatorID">[];
export type getAllCourseResponseDTO = Omit<Course, "creatorID">[];
