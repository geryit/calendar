import { Fjalla_One, Libre_Franklin, Work_Sans } from "next/font/google";

export const fjalla = Fjalla_One({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fjalla",
});

export const libre = Libre_Franklin({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-libre",
});

export const workSans = Work_Sans({
  weight: ["700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
});
