"use client";
import React from "react";
import "./globals.css";
import { Toaster } from "sonner";

export default function RootLayout({ children }: any) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
