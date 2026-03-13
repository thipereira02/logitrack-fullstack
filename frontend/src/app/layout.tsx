import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Isso aqui é o que carrega o Tailwind!
import Sidebar from "@/components/Sidebar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LogiTrack Pro",
  description: "Sistema de Gestão de Frotas e Manutenções",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} flex min-h-screen bg-slate-50 text-slate-900`}>
        <Sidebar />
        
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>

        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}