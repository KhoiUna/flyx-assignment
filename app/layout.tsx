"use client";

import Head from "./head";
import "../styles/globals.css";

export default function RootLayout({ children }: any) {
  return (
    <html>
      <Head />

      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
