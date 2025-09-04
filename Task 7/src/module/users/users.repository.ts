import { BaseRepository } from "../../shard/BRepository/base.repository";
import { User } from "./users.entity";

const admin: User = {
  id: "0",
  name: "ADMIN",
  email: "admin@no.com",
  password:
    "$argon2id$v=19$m=65536,t=3,p=4$ythEH1QGst2e2sKHVn4Baw$EbPIovaozQSEwqQYDUif7xBSQ27QqeqXRHc8hLhLOvM",
  role: "ADMIN",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super();
    this.items = [admin];
  }

  getUser(id: string): User | undefined {
    return this.getById(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.items.find((item) => item.email == email);
  }

  async createUser(item: Omit<User, "id">): Promise<User> {
    return this.create(item);
  }

  async updateUser(id: string, item: Partial<User>): Promise<User | undefined> {
    return this.update(id, item);
  }

  async createCoach(item: Omit<User, "id">): Promise<User> {
    item.role = "COACH";
    return this.create(item);
  }
}
