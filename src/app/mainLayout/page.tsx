import Auth from "../auth/page";
import Navbar from "../components/navbar";
import styles from "../page.module.css";

export default function MainLayout() {
  return (
    <div className={styles.mainLayout}>
        {/* <Navbar /> */}
        <Auth />
    </div>
  );
}