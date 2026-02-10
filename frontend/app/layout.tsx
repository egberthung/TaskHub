import type { Metadata } from "next";
import "@/styles/globals.css";
import NavBarWrapper from "@/wrapper/NavBarWrapper";
import { isUserLoggedIn } from "@/composables/utility";

export const metadata: Metadata = {
  title: "TaskHub",
  description: "Make task and do it!!!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLogin = await isUserLoggedIn();

  return (
    <html lang="en">
      <body className="bg-gray-950 select-none overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div
            className="
              absolute top-1/3 left-1/2 -translate-x-1/2
              w-225 h-225
              bg-linear-to-r from-cyan-700 via-blue-900 to-purple-800
              blur-[200px] opacity-25
            "
          />
        </div>
        <NavBarWrapper isLogin={isLogin} />
        <main>{children}</main>
      </body>
    </html>
  );
}
