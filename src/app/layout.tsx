import type { Metadata } from "next";
import { Roboto, Sacramento } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const roboto = Roboto({
  subsets: ["cyrillic"],
  weight: "400",
  variable: "--font-roboto",
  style: ["normal", "italic"],
});
const sacramento = Sacramento({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sacramento",
});

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
      <body className={`${roboto.variable} ${sacramento.variable}`}>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
