//create layout component
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <title>kok</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
