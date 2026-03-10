import type { Metadata } from "next";
import { Inter, JetBrains_Mono, VT323 } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const vt323 = VT323({
  variable: "--font-vt323",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Geo-Sentinel Tactical Dashboard | Tim Analisis Intelijen",
  description: "24/7 Strategic Command Center Monitoring",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${vt323.variable} antialiased bg-tactical-950 text-tactical-200 font-mono`}
      >
        {children}
      </body>
    </html>
  );
}
