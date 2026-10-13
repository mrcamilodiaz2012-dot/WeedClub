import type { Metadata } from "next";
import localFont from "next/font/local";
import { BottomTabBar } from "@/components/layout/BottomTabBar";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "WeedClub",
  description: "Descubre clubes y consulta información de forma clara y responsable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <BottomTabBar />
      </body>
    </html>
  );
}
