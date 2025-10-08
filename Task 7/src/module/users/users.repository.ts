import mongoose from "mongoose";
import { BaseRepository } from "../../shard/BRepository/base.repository";
import User, { IUser } from "./users.entity";
import { removeFields } from "../../shard/utils/object.util";

const admin: IUser = {
  id: "0",
  name: "ADMIN",
  email: "admin@no.com",
  password:
    "$argon2id$v=19$m=65536,t=3,p=4$ythEH1QGst2e2sKHVn4Baw$EbPIovaozQSEwqQYDUif7xBSQ27QqeqXRHc8hLhLOvM",
  role: "ADMIN",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super();
    this.items = [admin];
  }

  async getUser(id: string) {
    return User.findById({ id }).exec(); //this.getById(id);
  }

  async getUserByEmail(email: string) {
    return User.findOne({ email }).exec();
  }

  async createUser(item: Omit<IUser, "id">) {
    const user = new User(item);
    const userflat = (await user.save()).toObject();
    return userflat;
  }

  async updateUser(id: string, item: Partial<IUser>) {
    // const mid = new mongoose.Types.ObjectId(id);
    return User.updateOne({ _id: id }, item).exec();
  }

  async createCoach(item: Omit<IUser, "id">) {
    item.role = "COACH";
    const user = new User(item);
    return user.save();
  }
}
