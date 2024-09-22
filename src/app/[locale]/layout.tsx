import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/shared/Navbar";
import StoreProvider from "@/components/shared/StoreProvider";
import Footer from "@/components/Footer";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eventzone",
  description: "Event Zone is a community-driven professional event platform.",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;500;700&display=swap"
          rel="stylesheet"
        />
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Eventzone" />
        <meta
          property="og:description"
          content="Event Zone is a community-driven professional event platform."
        />
        <meta
          property="og:image"
          content="https://www.eventzone.pro/images/footerLogo.svg"
        />{" "}
        {/* Replace with your image URL */}
        <meta property="og:url" content="https://www.eventzone.pro" />
        <meta property="og:type" content="website" />
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Eventzone" />
        <meta
          name="twitter:description"
          content="Event Zone is a community-driven professional event platform."
        />
        <meta
          name="twitter:image"
          content="https://www.eventzone.pro/image/footerLogo.svg"
        />{" "}
        {/* Replace with your image URL */}
      </head>
      <body
        style={{ fontFamily: "Poppins , sans-serif" }}
        className={` flex min-h-screen flex-col element-with-scrollbar  ${inter.className}`}
      >
        <NextIntlClientProvider messages={messages}>
          <StoreProvider>
            <Navbar />
            <main className=" md:px-[0px] px-[20px] flex-grow flex flex-col">
              {children}
            </main>
            <Footer />
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
