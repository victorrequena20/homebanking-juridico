import { ArrowDes, BellIcon, SettingBold } from "../../assets/icons";
import { SearchBarProps } from "./SearchBarProps";
import styles from "./SearchBar.module.css";

export default function SearchBar({}: SearchBarProps) {
  return (
    <div className={styles.searchContainer}>
      <div>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search"
        />
      </div>
      <div className={styles.userConteiner}>
        <div>
          <SettingBold className={styles.iconsNavbar} />
        </div>
        <div>
          <BellIcon className={styles.iconsNavbar} />
        </div>
        <div>
          <span>Juan Salazar </span>
          <ArrowDes style={{ fontSize: 8 }} />
        </div>
      </div>
    </div>
  );
}
