import Auth from "./auth/login/page";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.headerBlu} />
      <div className={styles.principalConteiner}>{/* <Auth /> */}</div>
    </div>
  );
}
