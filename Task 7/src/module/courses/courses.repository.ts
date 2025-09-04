import { BaseRepository } from "../../shard/BRepository/base.repository";
import { Course } from "./courses.entity";

export class CourseRepository extends BaseRepository<Course> {
  constructor() {
    super();
  }

  getCourse(id: string): Course | undefined {
    return this.getById(id);
  }

  async getCourses(creatorID: string): Promise<Course[] | undefined> {
    return this.items.filter((item) => item.creatorID == creatorID);
  }

  async createCourse(item: Omit<Course, "id">): Promise<Course> {
    return this.create(item);
  }

  async updateCourse(
    id: string,
    item: Partial<Course>
  ): Promise<Course | undefined> {
    return this.update(id, item);
  }

  async deleteCourse(id: string): Promise<Boolean> {
    return this.delete(id);
  }
}
