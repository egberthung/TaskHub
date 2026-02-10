import { AuthForm } from "@/components";
import { redirectIfLoggedIn } from "@/composables/utility";
import React from "react";

const page = async () => {
  await redirectIfLoggedIn();
  return (
    <div className="flex h-screen items-center justify-center">
      <AuthForm type="Register" />
    </div>
  );
};

export default page;
