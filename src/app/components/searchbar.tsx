import styles from "../page.module.css";

export default function Searchbar() {
    return (
        <div className={styles.searchContainer}>
            <div>
                <input className={styles.searchInput} type="text" placeholder="Search" />
            </div>
            <div className={styles.userConteiner}>
                <div>
                    <span>Ico</span> 
                </div>
                <div>
                    <span>Ico</span> 
                </div>
                <div>
                    <span>Juan Salazar</span>
                </div>
            </div>
        </div>
    )
}