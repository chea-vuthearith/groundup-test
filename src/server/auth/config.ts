import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { DefaultSession, NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

import { dbService } from "~/server/db";
import {
    accounts,
  users,
} from "~/server/db/schema";
import { userAuthenticationService } from "../api/domains/user-management/services";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
const db = dbService.getQueryClient()
export const authConfig = {
  providers: [

  CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if ( !credentials?.username|| !credentials?.password) return null
        const user = await userAuthenticationService.authenticate(credentials.username as string, credentials.password as string)
        return user.getValue()
      }
    })
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable:accounts,
  }),
  session:{
    strategy:"jwt"
  },
  secret:process.env.AUTH_SECRET,
  callbacks: {
    async jwt({token, user, session}){
      if (user) {
        token.id = user.id;
      }
      return token
    },
    async session ({ session, token, user }) {
      return { ...session,
      user: {
        ...session.user,
          id: token.id as string
      } }
    },
  },
} satisfies NextAuthConfig;
