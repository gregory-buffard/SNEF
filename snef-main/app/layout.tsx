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
  description: "SNEF",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${font.className} scroll-smooth`}>
    <head>
      <title>SNEF</title>
      <link rel={'icon'} href={'/favicon.ico'} />
    </head>
      <body className="m-auto overflow-y-hidden">{children}</body>
    </html>
  );
}
