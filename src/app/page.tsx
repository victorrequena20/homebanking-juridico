import Auth from "./auth/page";
import MainLayout from "./mainLayout/page";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.headerBlu}></div>
      <div className={styles.principalConteiner}>
        {/* <Auth /> */}
        <MainLayout />
      </div>
    </main>
  );
}
