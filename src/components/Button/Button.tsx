import React from "react";
import { IButtonProps } from "./ButtonsProps";
import styles from "./ButtonStyles.module.css";

export default function Button(props: IButtonProps) {
  const { text, variant, size } = props;
  return (
    <button
      className={`${styles.btn} ${variant === "primary" && styles["btn-primary"]}
      ${variant === "warning-red" && styles["btn-warning-red"]}
      ${variant === "success" && styles["btn-success"]}
      ${styles[size || "large"]}`}
      onClick={props.onClick}
    >
      {text}
    </button>
  );
}
