import { ReactNode } from "react";
import { IBM_Plex_Sans } from "next/font/google";

const font = IBM_Plex_Sans({
    weight: ["500", "400"],
    style: ["italic", "normal"],
    subsets: ["latin"],
    display: "swap",
});
export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
        <body className={`${font.className} scroll-smooth overflow-y-auto`}>{children}</body>
        </html>
    );
}
