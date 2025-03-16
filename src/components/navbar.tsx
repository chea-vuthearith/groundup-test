"use client";
import { BellDot, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import groundUpLogo from "~/../public/GroundUp.png";

const pages = ["dashboard", "alerts"];
const Navbar = ({ username }: { username: string }) => {
  const currPage = usePathname();
  return (
    <div className="flex items-center gap-7 border-b border-b-gray-500 px-[0.875rem]">
      <Image src={groundUpLogo} alt="GroundUp Logo" />
      <nav className="flex w-full items-center justify-between">
        {/* left nav */}
        <ul className="flex flex-row text-sm">
          {pages.map((page) => {
            const pathname = `/app/${page}`;
            const isCurrentPage = currPage === pathname;
            return (
              <li key={pathname} className="flex">
                <Link
                  href={pathname}
                  className={`px-6 py-4 ${
                    isCurrentPage
                      ? "border-b-[3px] border-b-primary bg-[#F0F5FF] "
                      : ""
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
        <ul className="flex flex-row gap-4 [&>svg]:h-5 [&>svg]:stroke-1 [&>svg]:stroke-gray-500">
          <Settings />
          <User />
          <BellDot />
          <div className="min-h-full w-[1px] bg-gray-500" />
          <p className="text-gray-500 text-sm">
            Welcome {username.charAt(0).toUpperCase() + username.slice(1)}!
          </p>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
