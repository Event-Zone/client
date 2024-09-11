import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import StoreProvider from "@/components/shared/StoreProvider";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Event Zone",
  description: "Event Zone is a community-driven professional event platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body
        style={{ fontFamily: "Poppins , sans-serif" }}
        className={`flex min-h-screen flex-col element-with-scrollbar  ${inter.className}`}
      >
        <StoreProvider>
          <Navbar />
          <main className="flex-grow flex flex-col">{children}</main>
          {/* <Footer /> */}
        </StoreProvider>
      </body>
    </html>
  );
}
