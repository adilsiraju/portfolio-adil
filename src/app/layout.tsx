import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ToastProvider from "@/components/ToastProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohammed Adil Siraju | AI & ML Engineer",
  description: "AI & ML Engineering graduate building sustainable tech solutions using Python, ML, and DevOps pipelines. Portfolio showcasing projects in artificial intelligence, machine learning, and web development.",
  keywords: ["AI Engineer", "Machine Learning", "Python Developer", "DevOps", "AI ML Graduate", "Sustainable Technology"],
  authors: [{ name: "Mohammed Adil Siraju" }],
  creator: "Mohammed Adil Siraju",
  openGraph: {
    title: "Mohammed Adil Siraju | AI & ML Engineer",
    description: "AI & ML Engineering graduate building sustainable tech solutions using Python, ML, and DevOps pipelines.",
    url: "https://adilsiraju.github.io",
    siteName: "Mohammed Adil Siraju Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Adil Siraju | AI & ML Engineer",
    description: "AI & ML Engineering graduate building sustainable tech solutions using Python, ML, and DevOps pipelines.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
