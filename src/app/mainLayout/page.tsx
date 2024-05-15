import Auth from "../auth/page";
import Formulario from "../clients/page";
import Navbar from "../components/navbar";
import Searchbar from "../components/searchbar";
import styles from "../page.module.css";

export default function MainLayout() {
  return (
    <div className={styles.mainLayout}>
        <Navbar />
        <Searchbar />

        

        {/* <Formulario /> */}
        {/* <Auth /> */}

    </div>
  );
}