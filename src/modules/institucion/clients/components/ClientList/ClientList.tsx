import { BinBold, InformationBold, ShapeUser } from "@/assets/icons";
import { ClientListProps } from "./ClientListProps";
import styles from "./ClientList.module.css";

export default function ClientList({}: ClientListProps) {
  return (
    <div className={styles.clientsListContainer}>
      <div className={styles.clientSearchContainer}>
        <input
          className={styles.searchUserInput}
          type="text"
          placeholder="Search User"
        />
        <div className={styles.iconsUserListContainer}>
          <ShapeUser />
          <InformationBold />
          <BinBold />
        </div>
      </div>
    </div>
  );
}
