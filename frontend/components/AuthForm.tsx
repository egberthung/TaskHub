"use client";
import React, { useState } from "react";
import { Navbar } from "@/components";
import { AuthFormProps } from "@/types";
import { Icon } from "@iconify/react";
import CustomButton from "./CustomButton";
import { useRouter } from "next/navigation";

const AuthForm = ({ type }: AuthFormProps) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reinputPassword, setReinputPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showReinputPassword, setShowReinputPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isAuthLogin = type === "Login";
  const helperText = isAuthLogin ? "Belum punya akun?" : "Sudah punya akun?";
  const linkRedirection = isAuthLogin ? "register" : "login";

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAuthLogin) {
      handleLogin();
    } else {
      if (reinputPassword !== password) {
        setErrorMessage("Your Password don't match");
        setReinputPassword("");
        return;
      }
      if (
        password.length < 6 ||
        !/[A-Z]/.test(password) ||
        !/[!@#$%^&*(),.?":{}|<>]/.test(password)
      ) {
        setErrorMessage(
          "Password must be at least 6 characters and include 1 uppercase letter and 1 special character",
        );
        return;
      }
      handleRegister();
    }
  };

  const handleLogin = async () => {
    const res = await fetch("http://localhost:8081/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      setErrorMessage(data.error);
      setPassword("");
      return;
    }
    localStorage.setItem("token", data.token);
    router.push("/dashboard");
  };

  const handleRegister = async () => {
    const res = await fetch("http://localhost:8081/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      setErrorMessage(data.error);
      setPassword("");
      return;
    }
    localStorage.setItem("token", data.token);
    router.push("/dashboard");
  };

  return (
    <div className="w-150 bg-gray-900 border-2 border-gray-700 rounded-2xl">
      <Navbar />
      <div className="border-b border-gray-700" />
      <div className="text-white px-11 py-4 mb-3">
        <h1 className="font-medium text-3xl select-none">{type}</h1>
        {errorMessage && (
          <div className="mt-3 flex items-center gap-3 w-full rounded-xl bg-red-900/30 p-3 border-red-400 border text-sm text-red-300">
            <Icon icon="foundation:alert" className="text-lg" />
            <p className="font-sm">{errorMessage}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex-col gap-3 my-3">
          {/* Username */}
          {!isAuthLogin && (
            <>
              <label htmlFor="name" className="block mb-2 text-lg">
                Username
              </label>
              <input
                id="name"
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 mb-4 ring-gray-600 ring-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 "
                placeholder="Enter your username"
                required
              />
            </>
          )}
          {/* Email */}
          <label htmlFor="email" className="block mb-2 text-lg">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 ring-gray-600 ring-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 "
            placeholder="Enter your email address"
            required
          />
          {/* Password */}
          <label htmlFor="password" className="block mb-2 text-lg">
            Password
          </label>
          <div className="relative w-full">
            <Icon
              icon={showPassword ? "f7:eye-slash" : "f7:eye"}
              className="absolute right-3 top-1/2 -translate-y-4.5 text-gray-500 cursor-pointer text-lg   "
              onClick={() => setShowPassword(!showPassword)}
            />
            <input
              id="password"
              type={!showPassword ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 ring-gray-600 ring-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 "
              placeholder="Enter your password"
              required
            />
          </div>

          {/*Reinput Password */}
          {!isAuthLogin && (
            <>
              <label htmlFor="password" className="block mb-2 text-lg">
                Reinput Password
              </label>
              <div className="relative w-full">
                <Icon
                  icon={showReinputPassword ? "f7:eye-slash" : "f7:eye"}
                  className="absolute right-3 top-1/2 -translate-y-4.5 text-gray-500 cursor-pointer text-lg   "
                  onClick={() => setShowReinputPassword(!showReinputPassword)}
                />
                <input
                  id="Reinput password"
                  type={!showReinputPassword ? "password" : "text"}
                  value={reinputPassword}
                  onChange={(e) => setReinputPassword(e.target.value)}
                  className="w-full p-2 mb-4 ring-gray-600 ring-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 "
                  placeholder="Reinput your password"
                  required={isAuthLogin ? false : true}
                />
              </div>
            </>
          )}

          <CustomButton
            title={type}
            type="submit"
            className="w-full mt-3 p-2 rounded-2xl bg-cyan-600 text-sm hover:bg-white"
          />
        </form>
        <p className="py-3 block text-center text-gray-500 font-medium">
          {helperText}{" "}
          <span
            className="text-cyan-500 font-bold hover:text-white hover:cursor-pointer capitalize"
            onClick={() => router.push(`/${linkRedirection}`)}
          >
            {linkRedirection}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
