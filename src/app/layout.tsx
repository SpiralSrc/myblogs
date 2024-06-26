import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const baseUrl = process.env.MY_URL as string;

export const metadata: Metadata = {
  metadataBase: new URL(`${baseUrl}`),
  title: "SpiralSrc Blogs",
  description: "SpiralSrc blogs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-screen h-screen">{children}</div>
      </body>
    </html>
  );
}
