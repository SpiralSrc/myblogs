import { ImageResponse } from "next/og";
import { Inter } from "next/font/google";

export const runtime = "edge";

// Image metadata
export const alt = "SpiralSrc Blogs";
export const size = {
  width: 1200,
  height: 630,
};

const inter = Inter({
  subsets: ["cyrillic"],
  weight: "400",
  variable: "--font-inter",
  style: ["normal"],
});

export const contentType = "../../public/seo-image.png";

// Image generation
export default async function Image() {
  // Font
  const interSemiBold = fetch(
    new URL(`${inter.variable}`, import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        SpiralSrc Blogs
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "Inter",
          data: await interSemiBold,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
