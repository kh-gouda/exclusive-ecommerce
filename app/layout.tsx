import type { Metadata } from "next";
import { poppins } from "@shared/fonts";
import "@ui/globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import NextAuthSessionProvider from "@/app/providers";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: {
    template: "%s | Exclusive-ECommerce",
    default: "Exclusive-ECommerce",
  },
  description:
    "This Is Exclusive ECommerce Platform Where You Can Find Any Product You Wish And Enjoy Smooth Online Shopping Experience",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased font-normal`}>
        <NextAuthSessionProvider session={session}>
          {children}
          <ToastContainer />
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
