import { Prisma, PrismaClient } from "../../../generated/prisma";
import { BaseRepository } from "../../shard/BRepository/base.repository";
import { Course } from "./courses.entity";

export class CourseRepository extends BaseRepository<Course> {
  private prisma = new PrismaClient().course;

  async getCourse(id: number) {
    return this.prisma.findUnique({
      where: { id },
    });
  }

  async getCourses(creatorID: number) {
    return this.prisma.findMany({
      where: { creatorID: creatorID },
    });
    // return this.items.filter((item) => item.creatorID == creatorID);
  }

  async createCourse(item: Prisma.CourseCreateInput) {
    return this.prisma.create({
      data: item,
    });
  }

  async updateCourse(id: number, item: Prisma.CourseUpdateInput) {
    return this.prisma.update({
      data: item,
      where: { id },
    });
  }

  async deleteCourse(id: number) {
    return this.prisma.delete({ where: { id } });
  }
}
