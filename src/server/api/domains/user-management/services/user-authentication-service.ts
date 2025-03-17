import type { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import type { UserRepository } from "../repositories/user-repository";

export class UserAutheticationService {
  constructor(private readonly userRepository: UserRepository) {}
  // used by next-auth
  public async authenticate(username: string, password: string) {
    try {
      const user = await this.userRepository.findOneByUsername(username);
      const isPasswordValid = await bcrypt.compare(
        password,
        user.getValue().password,
      );
      if (isPasswordValid) return user.getValue();

      return null;
    } catch (e) {
      const error = e as TRPCError;
      if (error.code === "NOT_FOUND") return null;
    }
  }
}
