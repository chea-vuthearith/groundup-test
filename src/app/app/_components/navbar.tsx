"use client";
import { BellDot, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import groundUpLogo from "~/../public/GroundUp.png";
import { cn } from "~/lib/utils";
import { capitalize } from "~/utils/common";

const pages = ["dashboard", "alerts"];
const Navbar = ({ username }: { username: string }) => {
  const currPage = usePathname();
  return (
    <div
      className={cn(
        "flex items-center gap-7 border-b border-b-gray-500 px-[0.875rem]",
      )}
    >
      <Image src={groundUpLogo} alt="GroundUp Logo" />
      <nav className={cn("flex w-full items-center justify-between")}>
        {/* left nav */}
        <ul className={cn("flex flex-row text-sm")}>
          {pages.map((page) => {
            const pathname = `/app/${page}`;
            const isCurrentPage = currPage === pathname;
            return (
              <li key={pathname} className={cn("flex")}>
                <Link
                  href={pathname}
                  className={`border-b-[3px] px-6 py-4 ${
                    isCurrentPage
                      ? " border-b-primary bg-[#F0F5FF] "
                      : "border-b-transparent"
                  }
                  `}
                >
                  {page.toUpperCase()}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* right nav */}
        <ul
          className={cn(
            "flex flex-row gap-4 [&>svg]:h-5 [&>svg]:stroke-1 [&>svg]:stroke-gray-500",
          )}
        >
          <Settings />
          <User />
          <BellDot />
          <div className={cn("min-h-full w-[1px] bg-gray-500")} />
          <p className={cn("text-gray-500 text-sm")}>
            Welcome {capitalize(username)}!
          </p>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
