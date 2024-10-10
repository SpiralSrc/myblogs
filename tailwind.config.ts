import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xxs: "350px",
        xs: "480px",
        sm: "640px",
        md: "840px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1620px",
        "4xl": "1920px",
      },
      fontFamily: {
        sacramento: ["var(--font-sacramento)"],
        roboto: ["var(--font-roboto)"],
        vibes: ["var(--font-vibes)"],
      },
      backgroundImage: {
        "section-gradient1":
          "linear-gradient(to bottom, #f59f99b0, #cea89c, #f3d5cf)",
        "section-gradient2":
          "linear-gradient(to top, #f59f99b0, #cea89c, #f3d5cf)",
        "section-gradient3":
          "linear-gradient(to top, #f59f99b0, #f3d5cf, #cea89c,#f59f99b0)",
        "dark-gradient":
          "linear-gradient(170deg, rgba(47,20,9,1) 38%, rgba(92,28,5,1) 79%, rgba(158,108,90,1) 96%)",
        "dark-overlay": "rgba(255, 255, 255, 0.589)",
        "darker-overlay": "rgba(255, 255, 255, 1)",
        "sm-overlay": "rgba(167, 99, 99, 0.233)",
      },
      colors: {
        primary: "antiquewhite",
        secondary: "grey",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "antiquewhite",
            h2: {
              paddingLeft: "20px",
              color: "inherit",
              textTransform: "capitalize",
            },
            h3: {
              paddingLeft: "20px",
              color: "inherit",
              textTransform: "capitalize",
            },
            h4: {
              paddingLeft: "20px",
              color: "inherit",
              textTransform: "capitalize",
            },
            h5: {
              width: "90%",
              margin: "0 auto",
              paddingLeft: "15px",
              paddingRight: "15px",
              color: "inherit",
              backgroundColor: "rgb(38 31 34 / 0.7)",
            },
            h6: {
              width: "90%",
              fontSize: "13px",
              margin: "0 auto",
              paddingLeft: "15px",
              paddingRight: "15px",
              color: "inherit",
            },
            a: {
              color: "rgb(96 165 250)",
              textDecoration: "none",

              "&:hover": {
                color: "rgb(236 72 153 / 0.9)",
                transition: "all 500ms ease",
              },
            },
            button: {
              borderRadius: "20px",
              placeItem: "end",
              padding: "10px",
              marginLeft: "20px",
              borderWidth: "1px",
              borderColor: "rgba(54, 41, 41, 0.122)",
              backgroundColor: "rgba(54, 41, 41, 0.222)",

              "&:hover": {
                borderWidth: "1px",
                borderColor: "rgba(54, 41, 41, 0.622)",
                boxShadow: "0 20px 25px -5px rgb(0 0 0/ 0.1)",
              },
            },
            hr: {
              borderColor: "rgb(120 113 108 / 0.2)",
              marginLeft: "5%",
              marginRight: "5%",
            },
            ul: {
              marginLeft: "25px",
              marginRight: "25px",
            },
            ol: {
              marginLeft: "25px",
              marginRight: "25px",
              color: "inherit",
            },
            p: {
              paddingLeft: "20px",
              paddingRight: "20px",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
