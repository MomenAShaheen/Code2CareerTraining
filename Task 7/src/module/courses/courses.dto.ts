import { ICourse } from "./courses.entity";

export type createCourseDTO = Pick<ICourse, "title" | "description" | "image">;

export type createCourseResponseDTO = Omit<ICourse, "creatorID" | "id">;

// export type updateICourseDTO = Pick<ICourse, "id"> &
//   Partial<Omit<ICourse, "creatorID" | "createdAt" | "updatedAt" | "id">>;

export type updateCourseDTO = Partial<
  Omit<ICourse, "creatorID" | "createdAt" | "updatedAt" | "id">
>;

export type updateCourseResponseDTO = Omit<ICourse, "creatorID">;

export type getCourseResponseDTO = Omit<ICourse, "creatorID">;
export type getCoursesResponseDTO = Omit<ICourse, "creatorID">[];
export type getAllCourseResponseDTO = Omit<ICourse, "creatorID">[];
