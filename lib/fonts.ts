import { Noto_Sans_Thai, Oswald, Source_Sans_3 } from "next/font/google";

export const displayFont = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

export const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const thaiFont = Noto_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-noto-thai",
  display: "swap",
});
