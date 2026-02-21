import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Phantom | 3D E-Commerce Experiences",
  description: "Crafting immersive 3D shopping experiences that transcend the ordinary. Elevate your e-commerce with cutting-edge WebGL technology.",
  keywords: ["3D e-commerce", "WebGL", "Three.js", "immersive shopping", "3D product visualization", "Phantom"],
  authors: [{ name: "Raphael (Phantom)" }],
  creator: "Phantom",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Phantom | 3D E-Commerce Experiences",
    description: "Crafting immersive 3D shopping experiences that transcend the ordinary.",
    siteName: "Phantom",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phantom | 3D E-Commerce Experiences",
    description: "Crafting immersive 3D shopping experiences that transcend the ordinary.",
    creator: "@phantomDev001",
  },
  icons: {
    icon: "/favicon/favicon.ico",
    apple: "/apple-touch-icon/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  metadataBase:
    process.env.NODE_ENV === "production"
      ? new URL("https://yourdomain.com")
      : undefined,
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
        {children}
      </body>
    </html>
  );
}