import bcrypt from "bcryptjs";
import type { UserRepository } from "../repositories/user-repository";

export class UserAutheticationService {
  constructor(private readonly userRepository: UserRepository) {}
  public async authenticate(username: string, password: string) {
    const user = await this.userRepository.findOneOrNullByUsername(username);
    if (user) {
      const result = await bcrypt.compare(password, user.getValue().password);
      if (result) return user.getValue();
    }
    return null;
  }
}
