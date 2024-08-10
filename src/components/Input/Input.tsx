import React from "react";
import { InputProps } from "./InputProps";
import { Box, Typography } from "@mui/material";
import styles from "./InputStyles.module.css";

export default function Input({ label, type }: InputProps) {
  return (
    <Box sx={{}}>
      <Typography variant="body2" color="#344054">
        {label}
      </Typography>
      <input
        type={type}
        placeholder="ejemplo@gmail.com"
        className={styles.input}
      />
    </Box>
  );
}
