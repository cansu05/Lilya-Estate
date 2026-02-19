import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "./components/Footer";
import Providers from "./providers";
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
  metadataBase: new URL("https://lilyaestate.com"),
  title: {
    default: "Lilya Estate",
    template: "%s | Lilya Estate",
  },
  description:
    "Premium real estate platform for buying, selling, and renting exceptional properties across Turkey.",
  icons: {
    icon: "/lilyum-icon.svg",
    shortcut: "/lilyum-icon.svg",
    apple: "/lilyum-icon.svg",
  },
  openGraph: {
    title: "Lilya Estate",
    description:
      "Premium real estate platform for buying, selling, and renting exceptional properties across Turkey.",
    type: "website",
    locale: "en_US",
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
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
