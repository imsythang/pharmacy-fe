import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Pharmacy - Your Health Partner",
  description:
    "Online pharmacy providing quality healthcare products and services",
  keywords: "pharmacy, healthcare, medicine, online pharmacy, health products",
  authors: [{ name: "Pharmacy Team" }],
  creator: "Pharmacy Team",
  publisher: "Pharmacy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Pharmacy - Your Health Partner",
    description:
      "Online pharmacy providing quality healthcare products and services",
    siteName: "Pharmacy",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pharmacy - Your Health Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pharmacy - Your Health Partner",
    description:
      "Online pharmacy providing quality healthcare products and services",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-gray-50`}>
        <div className="flex min-h-screen flex-col">
          <div className="sticky top-0 z-50">
            <Header />
          </div>
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
