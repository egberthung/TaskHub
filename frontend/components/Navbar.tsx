"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import { Auth } from "@/types";

const Navbar = ({ isLogin }: Auth) => {
  const route = useRouter();
  const pathName = usePathname();
  const isAuthPage = ["login", "register"].some((type) =>
    pathName.includes(type),
  );
  const isDefaultPage = pathName === "/";
  const [activeButton, setActiveButton] = useState("");

  const handleLogoClick = () => {
    if (isLogin) {
      route.push("/dashboard");
      setActiveButton("");
      return;
    }
    route.push("/");
    setActiveButton("");
  };

  return (
    <div
      className={`flex py-5 justify-between ${isAuthPage ? "px-10" : "px-20"}`}
    >
      <div onClick={handleLogoClick} className="cursor-pointer">
        <span className="text-3xl font-bold text-white">Task</span>
        <span className="text-3xl font-bold text-cyan-500">Hub</span>
      </div>
      {isDefaultPage && (
        <div className={`flex gap-5 text-lg text-white`}>
          <CustomButton title="Login" onClick={() => route.push("/login")} />
          <CustomButton
            title="Register"
            onClick={() => route.push("/register")}
          />
        </div>
      )}

      {isLogin && (
        <div className={`flex gap-5 text-lg text-white`}>
          <CustomButton
            title="Your task"
            className={`${activeButton === "task" ? "text-cyan-500" : ""}`}
            onClick={() => (route.push("/task"), setActiveButton("task"))}
          />
          <CustomButton
            title="About us"
            className={`${activeButton === "aboutUs" ? "text-cyan-500" : ""}`}
            onClick={() => (
              route.push("/about-us"),
              setActiveButton("aboutUs")
            )}
          />
          <CustomButton
            title="Profile"
            className={`${activeButton === "profile" ? "text-cyan-500" : ""}`}
            onClick={() => setActiveButton("profile")}
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
