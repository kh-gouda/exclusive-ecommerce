import type { Metadata } from "next";
import { poppins } from "@shared/fonts";
import "@ui/globals.css";
import Header from "@layout/header/Header";
import Footer from "@ui/layout/footer/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Exclusive-ECommerce",
    default: "Exclusive-ECommerce",
  },
  description:
    "This Is Exclusive ECommerce Platform Where You Can Find Any Product You Wish And Enjoy Smooth Online Shopping Experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased font-normal`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
