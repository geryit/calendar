// Importing specific Google fonts using Next.js font optimization feature.
import { Fjalla_One, Libre_Franklin, Work_Sans } from "next/font/google";

// Configuring the Fjalla One font.
export const fjalla = Fjalla_One({
  // Setting the font weight to 400 (normal weight).
  weight: ["400"], // Fjalla_One doesnt have weight 700.
  // Specifying the font subsets, in this case, 'latin'.
  subsets: ["latin"],
  // Using 'swap' to quickly display text in a system font then swap to the downloaded font for better performance.
  display: "swap",
  // Assigning a CSS variable for easy reference to this font in the application's styles.
  variable: "--font-fjalla",
});

// Configuring the Libre Franklin font.
export const libre = Libre_Franklin({
  // Setting the font weights to 400 (normal) and 700 (bold).
  weight: ["400", "700"],
  // Specifying the font subsets, 'latin' in this case.
  subsets: ["latin"],
  // Using 'swap' display for performance optimization.
  display: "swap",
  // Defining a CSS variable for this font for convenient referencing in styles.
  variable: "--font-libre",
});

// Configuring the Work Sans font.
export const workSans = Work_Sans({
  // Setting the font weight to 700 (bold).
  weight: ["700"],
  // Specifying the 'latin' font subset.
  subsets: ["latin"],
  // Using the 'swap' display setting for quick initial rendering.
  display: "swap",
  // Creating a CSS variable for referencing this font in the application's styles.
  variable: "--font-work-sans",
});
