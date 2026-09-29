import type { Metadata } from "next";
import localFont from "next/font/local";
import { Sacramento } from "next/font/google";
import "./globals.css";

const forrest = localFont({
  src: "../fonts/forrest-bold.otf",
  variable: "--font-forrest",
  display: "swap",
});

const sequelSans = localFont({
  src: "../fonts/sequel-sans.ttf",
  variable: "--font-sequel-sans",
  display: "swap",
});

const sacramento = Sacramento({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sacramento",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Xiembra | Focus Group",
  description: "Ayúdanos a mejorar Xiembra respondiendo esta breve encuesta de cata a ciegas. Tu opinión es importante.",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${forrest.variable} ${sequelSans.variable} ${sacramento.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
