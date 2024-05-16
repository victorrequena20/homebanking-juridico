import Auth from "../auth/page";
import Formulario from "../clients/page";
import Navbar from "../../components/navbar";
import Searchbar from "../../components/searchbar";
import styles from "../../page.module.css";
import NavClient from "../createClients/page";

export default function MainLayout() {
  return (
    <div className={styles.mainLayout}>
        <Navbar />
        <div className={styles.conteinerBlock}>
          <Searchbar />
          <NavClient />


          {/* <Formulario /> */}
          
          {/* <Auth /> */}
        </div>
    </div>
  );
}