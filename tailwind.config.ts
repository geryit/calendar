// Importing the Config type from the tailwindcss package.
import type { Config } from "tailwindcss";

// Declaring the configuration object for Tailwind CSS.
const config: Config = {
  // content: Specifies the paths to all template files within your project.
  // Tailwind will use these paths to tree-shake unused styles in production builds.
  content: [
    "./src/components/**/*.{ts,tsx}", // Path to all TS, TSX files in the components directory.
    "./src/app/**/*.{ts,tsx}", // Path to all TS, TSX files in the app directory.
  ],

  // theme: Defines the customization of Tailwind's default theme.
  theme: {
    extend: {
      // fontFamily: Extends the default font families with custom ones.
      fontFamily: {
        sans: ["var(--font-work-sans)"], // Custom 'work-sans' font family using CSS variable.
        fjalla: ["var(--font-fjalla)"], // Custom 'fjalla' font family using CSS variable.
        libre: ["var(--font-libre)"], // Custom 'libre' font family using CSS variable.
      },

      // colors: Extends the default color palette with custom colors.
      colors: {
        green: {
          450: "rgb(93, 175, 116)", // Custom green color with a specific shade (450).
        },
        black: {
          80: "rgba(0, 0, 0, 0.8)", // Custom black color with an alpha value (80% opacity).
        },
      },
    },
  },

  // plugins: An array to add Tailwind CSS plugins, but it's empty in this configuration.
  plugins: [],
};

// Exporting the configuration object as the default export of this module.
export default config;
