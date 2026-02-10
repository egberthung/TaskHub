"use client";
import Image from "next/image";
import React from "react";
import CustomButton from "./CustomButton";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-8 flex items-center gap-16">
        <div className="flex-1">
          <h1 className="text-white text-6xl font-semibold leading-tight mb-6">
            Track Tasks. <br />
            Measure Time. <br />
            Stay Productive.
          </h1>

          <p className="text-gray-400 text-lg max-w-lg">
            Simple task & time trackers built for modern teams.
          </p>

          <div className="mt-8 flex gap-4">
            <CustomButton
              title="Get Started"
              className="bg-cyan-600 rounded-2xl w-40 h-12 text-lg text-white hover:bg-white hover:scale-105 transition-all duration-200"
              onClick={() => router.push("/register")}
            />
            <CustomButton
              title="Login"
              className="w-40 h-12 text-lg rounded-2xl text-white hover:scale-105 transition-all duration-300 hover:ring hover:ring-cyan-600"
              onClick={() => router.push("/login")}
            />
          </div>
        </div>

        <div className="relative flex-1 h-105 -mr-12">
          <Image
            src="/hero.svg"
            alt="Task dashboard preview"
            loading="eager"
            fill
            className="object-contain pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
