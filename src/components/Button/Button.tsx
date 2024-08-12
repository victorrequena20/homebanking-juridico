import React from "react";
import { IButtonProps } from "./ButtonsProps";
import styles from "./ButtonStyles.module.css";
import PlusIcon from "@/assets/icons/PlusIcon";

export default function Button(props: IButtonProps) {
  const { text, variant, size, icon, disabled, iconLeft } = props;
  return (
    <button
      className={`${styles.btn} ${variant === "primary" && styles["btn-primary"]}
      ${variant === "warning-red" && styles["btn-warning-red"]}
      ${variant === "success" && styles["btn-success"]}
      ${variant === "navigation" && styles["btn-navigation"]}
      ${disabled && styles["disabled"]}
      ${iconLeft && styles["btn-reverse"]}
      ${styles[size || "large"]}`}
      onClick={props.onClick}
    >
      {icon}
      {text}
    </button>
  );
}
