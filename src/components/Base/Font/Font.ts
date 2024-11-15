import { Montserrat, Roboto_Mono } from "next/font/google";

export const FontSans = Montserrat({
  subsets: ["cyrillic", "latin"],
  display: "swap", // Improve the loading performance
  variable: "--font-sans",
});

export const FontSerif = Montserrat({
  subsets: ["cyrillic", "latin"],
  display: "swap", // Improve the loading performance
  variable: "--font-serif",
});

export const FontMono = Roboto_Mono({
  subsets: ["cyrillic", "latin"],
  display: "swap", // Improve the loading performance
  variable: "--font-mono",
});
