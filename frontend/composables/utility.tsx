import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const redirectIfLoggedIn = async (redirectTo = "/dashboard") => {
  const cookie = (await cookies()).get("user-login")?.value;
  const isLogin = !!cookie;

  if (isLogin) {
    redirect(redirectTo);
  }
};

export const redirectIfNotLoggedIn = async (redirectTo = "/") => {
  const cookie = (await cookies()).get("user-login")?.value;
  const isLogin = !!cookie;

  if (!isLogin) {
    redirect(redirectTo);
  }
};

export const isUserLoggedIn = async (): Promise<boolean> => {
  const cookie = (await cookies()).get("user-login")?.value;
  return !!cookie;
};
