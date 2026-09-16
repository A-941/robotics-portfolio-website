import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://robotics-portfolio-website.vercel.app"),
  title: "Dhruv Makwana | Arduino & Robotics Learning Journey",
  description:
    "2nd-year CS student documenting hardware, embedded systems, and robotics from scratch. Real breadboard schematics, verified C++ firmware, and physical hardware demos.",
  keywords: [
    "Arduino",
    "Robotics",
    "Embedded Systems",
    "Edge AI",
    "Dhruv Makwana",
    "Tinkercad Circuits",
    "Computer Science",
    "Breadboard Prototyping",
    "Digital Logic",
  ],
  authors: [{ name: "Dhruv Makwana", url: "https://github.com/A-941" }],
  creator: "Dhruv Makwana",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/A-941/arduino-robotics-journey",
    title: "Dhruv Makwana | Arduino & Robotics Learning Journey",
    description:
      "A complete technical chronicle of embedded engineering from first principles to autonomous robotics. Live breadboard demos and verified code.",
    siteName: "Dhruv's Robotics Journey",
    images: [
      {
        url: "/images/banner.jpg",
        width: 1200,
        height: 630,
        alt: "Dhruv's Arduino & Robotics Journey",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhruv Makwana | Arduino & Robotics Journey",
    description:
      "2nd-year CS student documenting hardware and robotics from scratch. Verified breadboard schematics and C++ code.",
    images: ["/images/banner.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 antialiased">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
