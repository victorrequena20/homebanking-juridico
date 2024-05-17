import styles from "../../../page.module.css";
import { BinBold, InformationBold, ShapeUser } from "../../../assets/icons";

export default function ClientList () {
    return (
        <div className={styles.clientsListContainer}>
            <div className={styles.clientSearchConteiner}>
                <input className={styles.searchUserInput} type="text" placeholder="Search User" />
                <div className={styles.iconsUserListConteiner}>
                    <ShapeUser />
                    <InformationBold />
                    <BinBold />
                </div>
            </div>
            
            

        </div>
    )
}