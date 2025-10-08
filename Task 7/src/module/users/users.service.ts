import { removeFields } from "../../shard/utils/object.util";
import { usersMeResponseDTO, updateUserDTO } from "./users.dto";
import { IUser, userRoles } from "./users.entity";
import { UserRepository } from "./users.repository";

class UserService {
  private repository = new UserRepository();

  async getUser(id: string): Promise<usersMeResponseDTO | null> {
    const duser = await this.repository.getUser(id);
    const user = duser?.toObject({ virtuals: false });
    console.log(user);
    if (!user) {
      return null;
    }
    return removeFields(user, ["password", "__v", "_id"]);
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    const duser = await this.repository.getUserByEmail(email);
    const user = duser?.toObject({ virtuals: false });
    if (!user) {
      return null;
    }
    return removeFields(user, ["__v", "_id"]);
  }

  async createUser(
    name: string,
    email: string,
    password: string,
    role: userRoles = "STUDENT"
  ) {
    const user: IUser = {
      id: "0",
      name: name,
      email: email,
      password: password,
      role: role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.repository.createUser(user);
  }

  async updateUser(id: string, user: updateUserDTO) {
    return this.repository.update(id, user);
  }
}

export const userService = new UserService();
