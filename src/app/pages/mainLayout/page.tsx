import Auth from "../auth/loginWebAdmin/page";
import Formulario from "../clients/createClientForm/page";
import Navbar from "../../components/navbar";
import styles from "../../page.module.css";
import NavClient from "../clients/createClientsNav/page";
import ClientList from "../clients/clientList/page";
import Searchbar from "@/app/components/SearchBar";

export default function MainLayout() {
  return (
    <div className={styles.mainLayout}>
      <Navbar />
      <div className={styles.conteinerBlock}>
        <Searchbar />
        <div className={styles.conteinerBlockSide}>
          <NavClient />
          {/* <ClientList /> */}
        </div>
        {/* <Formulario /> */} {/* <Auth /> */}
      </div>
    </div>
  );
}
