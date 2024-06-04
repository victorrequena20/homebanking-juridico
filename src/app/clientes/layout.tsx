import type { Metadata } from "next";
import "../globals.css";
import localFont from "next/font/local";
import NavBar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import styles from "../page.module.css";

// const satoshi = localFont({
//   src: "../assets/fonts/Satoshi_Complete/Fonts/Satoshi-Variable.ttf",
// });

export const metadata: Metadata = {
  title: "App BDC",
  description: "Admin page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.mainLayout}>
      <div className={styles.headerBlue} />
      <div style={{ display: "flex" }}>
        <NavBar />
        <div className={styles.conteinerBlock}>
          <SearchBar />
          <div className={styles.conteinerBlockSide}>{children}</div>
        </div>
      </div>
    </div>
  );
}
