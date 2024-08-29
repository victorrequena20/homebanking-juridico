import React, { Suspense } from "react";
import "./globals.css";
import { Toaster } from "sonner";
import "react-calendar/dist/Calendar.css";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   icons: {
//     icon: "/icon.ico",
//   },
// };

export default function RootLayout({ children }: any) {
  return (
    <html lang="es">
      <head>
        {/* <link rel="icon" href="/icon.ico" sizes="any" /> */}
        <title>Banco digital de caracas</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap"
          rel="stylesheet"
        /> */}
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        /> */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          <Toaster expand richColors visibleToasts={6} />
        </div>
      </body>
    </html>
  );
}
