import z, { ZodType } from "zod";
import { Course } from "./courses.entity";
import { createCourseDTO, updateCourseDTO } from "./courses.dto";

export const CourseSchema = z.object({
  id: z.string(), // Assuming it's a UUID, adjust if needed
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().url().optional().or(z.literal("")), // Optional URL or empty string
  createdAt: z.coerce.date(), // Handles both Date objects and string dates
  updatedAt: z.coerce.date(),
  creatorID: z.string(),
}) satisfies ZodType<Course>;

export const CreateCourseSchema = CourseSchema.pick({
  title: true,
  description: true,
  image: true,
}) satisfies ZodType<createCourseDTO>;

// export const UpdateCourseSchema = CourseSchema.pick({ id: true }).merge(
//   CourseSchema.pick({
//     title: true,
//     description: true,
//     image: true,
//   }).partial()
// ) satisfies ZodType<updateCourseDTO>;

export const UpdateCourseSchema = CourseSchema.pick({
  title: true,
  description: true,
  image: true,
}).partial() satisfies ZodType<updateCourseDTO>;
