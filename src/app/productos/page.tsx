"use client"

import styles from "../productos/product.module.css";
import { BinBold } from "../../assets/icons";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import Link from "next/link";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export function gridProducts() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Item>
            <h5 className={styles.gridComponentsHeader}>Productos de préstamo</h5>
            <p>Añadir, modificar o desactivar un producto de depósito recurrente</p>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <h5 className={styles.gridComponentsHeader}>Mezcla de productos</h5>
            <p>Define las reglas para tomar acciones pertinentes que permitan la participación</p>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <h5 className={styles.gridComponentsHeader}>Productos de ahorro</h5>
            <p>Agregar nuevo producto de ahorro o modificar inactivar el producto de ahorro</p>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <h5 className={styles.gridComponentsHeader}>Productos de depósito fijo</h5>
            <p>Añadir, modificar o desactivar un producto de depósito fijo</p>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <h5 className={styles.gridComponentsHeader}>Productos de participación</h5>
            <p>Añadir producto de participación nueva o modificar o inactivate producto de participación</p>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <h5 className={styles.gridComponentsHeader}>Administrar Configuraciones De Impuestos</h5>
            <p>Definir componentes de Impuesto y grupos de Impuesto</p>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <h5 className={styles.gridComponentsHeader}>Cargos</h5>
            <p>Definir cargos/multas para el producto de préstamo, ahorros y depósitos de productos</p>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <h5 className={styles.gridComponentsHeader}>Flotando Índices</h5>
            <p>Definir los tipos flotantes para los productos de préstamo</p>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default function CreatedProducts() {
  return (
    <div className={styles.productsConteiner}>
      <div className={styles.productsHeaderConteiner}>
        <div>
          <input
            className={styles.searchProductsInput}
            type="text"
            placeholder="Buscar productos por nombre"
          />
        </div>
        <div className={styles.productsHeader}>
          <Link href="/productos/productoscreados">Productos</Link>
        </div>
      </div>


      <div className={styles.gridConteiner}>
        {gridProducts()}
      </div>
      
    </div>
  );
}