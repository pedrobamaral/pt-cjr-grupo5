import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "Edu Ranking",
  description: "Edu Ranking - Avaliação de Professores",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
