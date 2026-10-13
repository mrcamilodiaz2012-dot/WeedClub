import type { Metadata } from "next";
import localFont from "next/font/local";
import { BottomTabBar } from "@/components/layout/BottomTabBar";
import { AgeGate } from "@/components/legal/AgeGate";
import { SiteFooter } from "@/components/legal/SiteFooter";
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
  title: {
    default: "WeedClub",
    template: "%s",
  },
  description: "Directorio de clubes y asociaciones: información, ubicación, horarios y contacto.",
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
        <SiteFooter />
        <BottomTabBar />
        <AgeGate />
      </body>
    </html>
  );
}
