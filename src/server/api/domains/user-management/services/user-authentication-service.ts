import bcrypt from "bcryptjs";
import type { UserProps } from "../models/user";
import type { UserRepository } from "../repositories/user-repository";

export class UserAutheticationService {
  constructor(private readonly userRepository: UserRepository) {}
  // used by next-auth
  public async authenticate(
    username: UserProps["name"],
    password: UserProps["password"],
  ) {
    const user = await this.userRepository.findOneByUsername(username);
    const isPasswordValid = await bcrypt.compare(
      password,
      user.getValue().password,
    );
    if (isPasswordValid) return user.getValue();

    return null;
  }
}
