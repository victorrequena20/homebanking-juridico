"use client"

import styles from "../product.module.css";
import { BinBold } from "../../../assets/icons";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import Link from "next/link";
import Divider from '@mui/material/Divider';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'start',
  color: theme.palette.text.secondary,
}));

export function gridProducts() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={5}>
        <Grid item md={14}>
          <Item>
            <h5 className={styles.gridComponentsHeader}>Detalles</h5>
            <Divider />
            <p>Descripción:</p>
            <p>Nombre corto:</p>
            <p>Incluir en el contador de préstamo al cliente:</p>
          </Item>
        </Grid>
        <Grid item md={14}>
          <Item>
            <h5 className={styles.gridComponentsHeader}>Detalles</h5>
            <Divider />
            <p>Descripción:</p>
            <p>Nombre corto:</p>
            <p>Incluir en el contador de préstamo al cliente:</p>
          </Item>
        </Grid>
        <Grid item md={14}>
          <Item>
            <h5 className={styles.gridComponentsHeader}>Detalles</h5>
            <Divider />
            <p>Descripción:</p>
            <p>Nombre corto:</p>
            <p>Incluir en el contador de préstamo al cliente:</p>
          </Item>
        </Grid>
        <Grid item md={14}>
          <Item>
            <h5 className={styles.gridComponentsHeader}>Detalles</h5>
            <Divider />
            <p>Descripción:</p>
            <p>Nombre corto:</p>
            <p>Incluir en el contador de préstamo al cliente:</p>
          </Item>
        </Grid>
        
        
        
        
      </Grid>
    </Box>
  );
}

export default function CreatedProducts() {
  return (
    <div className={styles.productsConteiner}>
        
        <div className={styles.productsEditHeaderConteiner}>
            <h4>7-Day Loan</h4>
            <Button variant="contained" className={styles.button}>
                Editar
            </Button>
        </div>


        <div className={styles.gridConteiner}>
        {gridProducts()}
        </div>
      
    </div>
  );
}