import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { LoadingScreen } from "@/components/LoadingScreen";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://robotics-portfolio-website-kohl.vercel.app"),
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
    url: "https://robotics-portfolio-website-kohl.vercel.app",
    title: "Robotics & Arduino Learning Lab",
    description:
      "A complete technical learning resource for embedded engineering and robotics from first principles.",
    siteName: "Robotics Learning Lab",
    images: [{ url: "/images/banner.jpg", width: 1200, height: 630, alt: "Robotics Learning Lab" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robotics & Arduino Learning Lab",
    description: "Step-by-step hardware tutorials, verified breadboard schematics, and clean C++ firmware.",
    images: ["/images/banner.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <body className="min-h-screen flex flex-col overflow-x-hidden antialiased">
        <SmoothScrollProvider>
          <LoadingScreen />
          <CustomCursor />
          <ScrollProgressBar />
          <Navbar />
          <main className="flex-grow relative">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
