import "@/styles/globals.css";
import "@/styles/globals.scss";
import { Inter } from 'next/font/google';
import type { Metadata } from "next";

const font = Inter({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Seu bloco de notas social.",
  icons: {
    icon: "/imgs/favicon.png"
  },
  openGraph: {
    title: "NoteHub",
    description: "Seu bloco de notas social.",
    url: "https://notehub.com.br",
    siteName: "NoteHub",
    images: [
      {
        url: "https://github.com/lucas-adm/next-react-notehub/blob/main/public/imgs/favicon.png",
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
    images: ["https://github.com/lucas-adm/next-react-notehub/blob/main/public/imgs/favicon.png"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={font.className}>
        {children}
      </body>
    </html>
  );
}