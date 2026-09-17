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
  title: "Robotics & Arduino Learning Lab | Real Circuits, Real Code, Real Explanations",
  description:
    "An open-source educational resource for beginners in ECE and robotics. Step-by-step breadboard diagrams, verified C++ firmware, and physical hardware demos from first principles.",
  keywords: [
    "Arduino Tutorials",
    "Robotics Guide",
    "Embedded Systems",
    "ECE Learning Resource",
    "Breadboard Circuits",
    "Digital Logic",
    "C++ Firmware",
    "Tinkercad Circuits",
    "Sensors and Actuators",
    "Edge AI & Physical Computing",
  ],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://robotics-portfolio-website.vercel.app",
    title: "Robotics & Arduino Learning Lab | Real Circuits, Real Code",
    description:
      "A complete technical learning resource for embedded engineering and robotics from first principles. Verified schematics, working code, and video demos.",
    siteName: "Robotics Learning Lab",
    images: [
      {
        url: "/images/banner.jpg",
        width: 1200,
        height: 630,
        alt: "Robotics Learning Lab Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robotics & Arduino Learning Lab",
    description:
      "Step-by-step hardware tutorials, verified breadboard schematics, and clean C++ firmware for beginners.",
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
      <body className="min-h-screen flex flex-col bg-[#08080c] text-zinc-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 antialiased overflow-x-hidden">
        <Navbar />
        <main className="flex-grow relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
