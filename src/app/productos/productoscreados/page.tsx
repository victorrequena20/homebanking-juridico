
import styles from "../product.module.css";
import { BinBold, InformationBold, ShapeUser } from "../../../assets/icons";
import { Box } from '@mui/material';
import DataTable from "./table";

export default async function CreatedProducts() {
  return (
    <div className={styles.productsConteiner}>
      <div className={styles.productsHeaderConteinerTable}>
        <h4 className={styles.headerProductTable}>Productos financieros creados</h4>
        <div className={styles.productsSearchConteiner}>
          <input
            className={styles.searchProductsInput}
            type="text"
            placeholder="Search User"
          />
          <button type="submit" className={styles.buttonCreateProducts}>
            Crear Producto Financiero
          </button>
        </div>
      </div>
      <div className={styles.productsList}>
        <DataTable />
      </div>
    </div>
  );
}
