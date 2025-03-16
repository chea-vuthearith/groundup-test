import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import type { UserRepository } from "../repositories/user-repository";

export class UserAutheticationService {
  constructor(private readonly userRepository: UserRepository) {}
  public async authenticate(username: string, password: string) {
    const user = await this.userRepository.findOneOrNullByUsername(username);
    if (!user)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User does not exist.",
      });
    const result = await bcrypt.compare(password, user?.getValue().password);
    if (result) return user;
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Wrong username or password.",
    });
  }
}
