import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xiembra | Focus Group",
  description: "Ayúdanos a mejorar Xiembra respondiendo esta breve encuesta de cata a ciegas. Tu opinión es importante.",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

