import type { Metadata } from "next";
import { Roboto, Sacramento } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

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
  title: {
    default: "SpiralSrc Blogs",
    template: "%s | SpiralSrc Blogs",
  },
  description:
    "Welcome to my personal blog! This blog is my little corner of the internet where I share my thoughts, experiences, and insights on various subjects that pique my interest.",
  openGraph: {
    title: "SpiralSrc Blogs",
    description:
      "Welcome to my personal blog! This blog is my little corner of the internet where I share my thoughts, experiences, and insights on various subjects that pique my interest.",
    url: baseUrl,
    siteName: "SpiralSrc Blogs",
    images: [
      {
        url: "../../public/seo-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={`${roboto.variable} ${sacramento.variable}`}>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
