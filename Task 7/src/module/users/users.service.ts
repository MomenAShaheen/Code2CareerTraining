import { removeFields } from "../../shard/utils/object.util";
import { usersMeResponseDTO, updateUserDTO } from "./users.dto";
import { User, userRoles } from "./users.entity";
import { UserRepository } from "./users.repository";

class UserService {
  private repository = new UserRepository();

  getUser(id: string): usersMeResponseDTO | null {
    const user = this.repository.getUser(id);
    console.log(user);
    if (!user) {
      return null;
    }
    return removeFields(user, ["password"]);
  }

  getUserByEmail(email: string): Promise<User | undefined> {
    return this.repository.getUserByEmail(email);
  }

  async createUser(
    name: string,
    email: string,
    password: string,
    role: userRoles = "STUDENT"
  ) {
    const user: User = {
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
