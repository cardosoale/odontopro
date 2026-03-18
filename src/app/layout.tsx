import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionAuthProvider from "@/components/session-auth";

import { Toaster, toast } from "sonner";
import { QueryClientContext } from "@/providers/queryClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OdontoPro",
  description: "Encontre os melhores profissionais em um único local!",
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
  openGraph: {
    title: "OdontoPro",
    description: "Encontre os melhores profissionais em um único local!",
    url: "https://odontopro-three.vercel.app/",
    siteName: "OdontoPro",
    locale: "pt_BR",
    type: "website",
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/doctor-hero.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionAuthProvider>
          <QueryClientContext>
            <Toaster duration={2500} position="top-center" />
            {children}
          </QueryClientContext>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
