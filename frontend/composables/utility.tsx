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

export function formatDateID(dateStr?: string) {
  if (!dateStr) return "-";

  const date = new Date(dateStr);

  if (date.getFullYear() === 1) return "-";

  return date.toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
