import "./global.css";
import { ReactNode } from "react";
import { IBM_Plex_Sans } from "next/font/google";

const font = IBM_Plex_Sans({
  weight: ["500", "400"],
  style: ["italic", "normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "SNEF",
  description: "SNEF",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={font.className + " scroll-smooth"}>
      <body className="m-auto">{children}</body>
    </html>
  );
}
