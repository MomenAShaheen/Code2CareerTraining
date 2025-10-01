import { PrismaClient } from "../../../generated/prisma";
import { BaseRepository } from "../../shard/BRepository/base.repository";
import { User } from "./users.entity";

const admin: User = {
  id: 0,
  name: "ADMIN",
  email: "admin@no.com",
  password:
    "$argon2id$v=19$m=65536,t=3,p=4$ythEH1QGst2e2sKHVn4Baw$EbPIovaozQSEwqQYDUif7xBSQ27QqeqXRHc8hLhLOvM",
  role: "ADMIN",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export class UserRepository {
  private prisma = new PrismaClient().user;

  async getUser(id: number) {
    return await this.prisma.findUnique({
      where: { id },
    });
  }

  async getUserByEmail(email: string) {
    return this.prisma.findUnique({
      where: { email },
    });
  }

  async createUser(item: Omit<User, "id">) {
    return this.prisma.create({ data: item });
  }

  async updateUser(id: number, item: Partial<User>) {
    return this.prisma.update({
      data: item,
      where: { id },
    });
  }

  async createCoach(item: Omit<User, "id">) {
    item.role = "COACH";
    return this.createUser(item);
  }
}
