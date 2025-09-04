import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ToastProvider from "@/components/ToastProvider";
import PWAManager from "@/components/PWAManager";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3b82f6" },
    { media: "(prefers-color-scheme: dark)", color: "#3b82f6" }
  ]
}

export const metadata: Metadata = {
  title: "Mohammed Adil Siraju | AI & ML Engineer",
  description: "AI & ML Engineering graduate building sustainable tech solutions using Python, ML, and DevOps pipelines. Portfolio showcasing projects in artificial intelligence, machine learning, and web development.",
  keywords: ["AI Engineer", "Machine Learning", "Python Developer", "DevOps", "AI ML Graduate", "Sustainable Technology"],
  authors: [{ name: "Mohammed Adil Siraju" }],
  creator: "Mohammed Adil Siraju",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  metadataBase: new URL("https://adilsiraju.github.io"),
  openGraph: {
    title: "Mohammed Adil Siraju | AI & ML Engineer",
    description: "AI & ML Engineering graduate building sustainable tech solutions using Python, ML, and DevOps pipelines.",
    url: "https://adilsiraju.github.io",
    siteName: "Mohammed Adil Siraju Portfolio",
    type: "website",
    images: [
      {
        url: "/images/adil.jpg",
        width: 1200,
        height: 630,
        alt: "Mohammed Adil Siraju - AI & ML Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Adil Siraju | AI & ML Engineer",
    description: "AI & ML Engineering graduate building sustainable tech solutions using Python, ML, and DevOps pipelines.",
    images: ["/images/adil.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Adil Portfolio"
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "application-name": "Adil Portfolio",
    "msapplication-TileColor": "#3b82f6",
    "msapplication-config": "/browserconfig.xml"
  }
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
          <PWAManager />
        </ToastProvider>
      </body>
    </html>
  );
}
