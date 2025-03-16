"use server";
import { signIn, signOut } from "~/server/auth";
import { ROUTE_PATHS } from "~/utils/constants/route-paths";

export const login = async () => {
  await signIn(undefined, { redirectTo: ROUTE_PATHS.HOME });
};
export const logout = async () => {
  await signOut({ redirectTo: ROUTE_PATHS.LOGIN });
};
