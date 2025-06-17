import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Edu Ranking",
  description: "Edu Ranking - Avaliação de Professores",
};

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700']
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.className}`}>
      <body className="font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
