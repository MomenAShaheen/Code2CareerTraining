import { removeFields } from "../../shard/utils/object.util";
import { usersMeResponseDTO, updateUserDTO } from "./users.dto";
import { User, userRoles } from "./users.entity";
import { UserRepository } from "./users.repository";

class UserService {
  private repository = new UserRepository();

  async getUser(id: number): Promise<usersMeResponseDTO | null> {
    const user = await this.repository.getUser(id);
    console.log(user);
    if (!user) {
      return null;
    }
    return removeFields(user, ["password"]);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = this.repository.getUserByEmail(email);
    return user;
  }

  async createUser(
    name: string,
    email: string,
    password: string,
    role: userRoles = "STUDENT"
  ) {
    const user = {
      name: name,
      email: email,
      password: password,
      role: role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.repository.createUser(user);
  }

  async updateUser(id: number, user: updateUserDTO) {
    return this.repository.updateUser(id, user);
  }
}

export const userService = new UserService();
