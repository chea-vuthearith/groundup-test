import "~/styles/globals.css";
import { Toaster } from "~/components/ui/sonner";

import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { cn } from "~/lib/utils";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "groundup",
  description: "dashboard for groundup",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable}`}
    >
      <body className={cn("flex h-dvh w-dvw flex-col")}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
