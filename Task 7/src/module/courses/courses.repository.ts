import { BaseRepository } from "../../shard/BRepository/base.repository";
import { ICourse } from "./courses.entity";

export class CourseRepository extends BaseRepository<ICourse> {
  constructor() {
    super();
  }

  getCourse(id: string): ICourse | undefined {
    return this.getById(id);
  }

  async getCourses(creatorID: string): Promise<ICourse[] | undefined> {
    return this.items.filter((item) => item.creatorID == creatorID);
  }

  async createCourse(item: Omit<ICourse, "id">): Promise<ICourse> {
    return this.create(item);
  }

  async updateCourse(
    id: string,
    item: Partial<ICourse>
  ): Promise<ICourse | undefined> {
    return this.update(id, item);
  }

  async deleteCourse(id: string): Promise<Boolean> {
    return this.delete(id);
  }
}
