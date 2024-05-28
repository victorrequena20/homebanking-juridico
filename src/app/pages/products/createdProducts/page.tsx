import styles from "../product.module.css"
import { BinBold, InformationBold, ShapeUser } from "../../../assets/icons";

export default function CreatedProducts () {
    return (
        <div className={styles.productsConteiner}>
            <div className={styles.productsHeaderConteiner}>
                <h4 className={styles.headerProduct}>Productos financieros creados</h4>
                <div className={styles.productsSearchConteiner}>
                    <input className={styles.searchProductsInput} type="text" placeholder="Search User" />
                    <button type="submit" className={styles.buttonCreateProducts}>
                        Crear Producto Financiero
                    </button>
                </div>
            </div>
            <div className={styles.productsList}>

            </div>
        </div>
    )
}