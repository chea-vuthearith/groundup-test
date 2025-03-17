import bcrypt from "bcryptjs";
import type { UserRepository } from "../repositories/user-repository";

export class UserAutheticationService {
  constructor(private readonly userRepository: UserRepository) {}
  // used by next-auth
  public async authenticate(username: string, password: string) {
    const user = await this.userRepository.findOneByUsername(username);
    const isPasswordValid = await bcrypt.compare(
      password,
      user.getValue().password,
    );
    if (isPasswordValid) return user.getValue();

    return null;
  }
}
