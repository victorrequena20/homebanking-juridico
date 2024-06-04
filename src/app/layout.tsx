import React from "react";
import localFont from "next/font/local";

const satoshi = localFont({
  src: "../assets/fonts/Satoshi-Variable.ttf",
});

export default function RootLayout({ children }: any) {
  return (
    <html lang="es">
      <body className={satoshi.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
