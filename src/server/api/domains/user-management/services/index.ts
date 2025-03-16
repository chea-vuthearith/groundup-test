import { userRepository } from "../repositories";
import { UserAutheticationService } from "./user-authentication-service";

export const userAuthenticationService = new UserAutheticationService(
  userRepository,
);
