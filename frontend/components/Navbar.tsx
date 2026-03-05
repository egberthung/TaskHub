"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import CustomButton from "./CustomButton";
import { Auth } from "@/types";

const Navbar = ({ isLogin }: Auth) => {
  const route = useRouter();
  const pathName = usePathname();
  const isAuthPage = ["login", "register"].some((type) =>
    pathName.includes(type),
  );
  const isDefaultPage = pathName === "/";
  const [activeButton, setActiveButton] = useState("dashboard");

  const handleLogoClick = () => {
    if (isLogin) {
      route.push("/dashboard");
      setActiveButton("dashboard");
      return;
    }
    route.push("/");
    setActiveButton("");
  };

  const handleLogout = async () => {
    const res = await fetch("http://localhost:8081/logout", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    window.location.href = "/";
    console.log(data.message);
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
            title="Dashboard"
            className={`${activeButton === "dashboard" ? "text-cyan-500" : ""}`}
            onClick={() => (
              route.push("/dashboard"),
              setActiveButton("dashboard")
            )}
          />
          <CustomButton
            title="About us"
            className={`${activeButton === "aboutUs" ? "text-cyan-500" : ""}`}
            onClick={() => (
              route.push("/about-us"),
              setActiveButton("aboutUs")
            )}
          />
          <div className="flex relative">
            <div className="flex">
              <CustomButton
                title="Profile"
                className={`${activeButton === "profile" ? "text-cyan-500" : ""}`}
                onClick={() =>
                  activeButton === "profile"
                    ? setActiveButton("")
                    : setActiveButton("profile")
                }
              />
            </div>
            {activeButton === "profile" && (
              <ul className="absolute mt-10 w-max p-4 font-medium bg-black/80 backdrop-blur-xl rounded-xl border border-white/10 shadow-lg max-h-60 overflow-y-auto z-50">
                <li className="hover:text-cyan-500">Edit profile</li>
                <li
                  className="hover:text-cyan-500 hover:cursor-pointer"
                  onClick={handleLogout}
                >
                  Log out
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
