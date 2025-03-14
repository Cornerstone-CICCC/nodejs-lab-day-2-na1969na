import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

interface User {
  id: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
}

class UserModel {
  private users: User[] = [];

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async login(username: string, password: string): Promise<User | null> {
    const user = await this.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async create(newUser: Omit<User, "id">): Promise<User> {
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    const user = {
      ...newUser,
      id: uuidv4(),
      password: hashedPassword,
    };
    this.users.push(user);
    return user;
  }
}

export default UserModel;
