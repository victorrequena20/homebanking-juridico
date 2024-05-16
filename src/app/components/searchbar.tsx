import styles from "../page.module.css";
import { ArrowDes, BellIcon, SettingBold } from "../assets/icons";

export default function Searchbar() {
    return (
        <div className={styles.searchContainer}>
            <div>
                <input className={styles.searchInput} type="text" placeholder="Search" />
            </div>
            <div className={styles.userConteiner}>
                <div>
                    <SettingBold className={styles.iconsNavbar} />
                </div>
                <div>
                    <BellIcon className={styles.iconsNavbar} />
                </div>
                <div>
                    <span>Juan Salazar </span><ArrowDes style={{fontSize: 8}} />
                </div>
            </div>
        </div>
    )
}