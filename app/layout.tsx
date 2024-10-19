import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export type Children = Readonly<{
  children: React.ReactNode;
}>;

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "iTrack | About",
  description: "Tracking your future!",
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
