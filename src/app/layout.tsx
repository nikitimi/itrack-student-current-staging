import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import type { Children } from "@/utils/types";
import { headers } from "next/headers";

const headerList = headers();

/** Place the icons inside the public folder. */
const icons = ["favicon.ico"].map(
  (path) => `${headerList.get("host")}/${path}`
);

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "iTrack | About",
  description: "Tracking your future!",
  icons,
};

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
