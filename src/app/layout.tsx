import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import Navbar from "~/components/navbar";
import { auth } from "~/server/auth";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "groundup",
  description: "dashboard for groundup",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable}`}
    >
      <body>
        <TRPCReactProvider>
          <Navbar username={session?.user.name ?? "User"} />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
