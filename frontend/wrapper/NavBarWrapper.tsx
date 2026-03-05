"use client";
import { Navbar } from "@/components";
import { Auth } from "@/types";
import { usePathname } from "next/navigation";

const NavBarWrapper = ({ isLogin }: Auth) => {
  const pathName = usePathname();
  if (["register", "login"].some((page) => pathName.includes(page)))
    return null;
  return <Navbar isLogin={isLogin} />;
};

export default NavBarWrapper;
