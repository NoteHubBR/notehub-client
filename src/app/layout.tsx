import "@/styles/globals.css";
import "@/styles/globals.scss";
import { Inter } from 'next/font/google';
import { SerwistProvider } from "@serwist/next/react";
import type { Metadata, Viewport } from "next";

const font = Inter({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Seu bloco de notas social.",
  icons: {
    icon: "https://notehub.com.br/imgs/favicon256.png"
  },
  openGraph: {
    title: "NoteHub",
    description: "Seu bloco de notas social.",
    url: "https://notehub.com.br",
    siteName: "NoteHub",
    images: [
      {
        url: "https://notehub.com.br/imgs/favicon256.png",
        width: 256,
        height: 256,
        alt: "NoteHub Logo",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoteHub",
    description: "Seu bloco de notas social.",
    images: ["https://notehub.com.br/imgs/favicon256.png"],
  }
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={font.className}>
        <SerwistProvider
          swUrl="/sw.js"
          disable={process.env.NODE_ENV === "development"}
        >
          {children}
        </SerwistProvider>
      </body>
    </html>
  );
}