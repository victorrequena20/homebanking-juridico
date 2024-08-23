import React from "react";
import { IButtonProps } from "./ButtonsProps";
import styles from "./ButtonStyles.module.css";
import PlusIcon from "@/assets/icons/PlusIcon";
import Loader from "../Loader";
import ArrowDownIcon from "@/assets/icons/ArrowDownIcon";

export default function Button(props: IButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const { text, variant = "primary", size = "small", icon, disabled, iconLeft, type } = props;
  return (
    <button
      disabled={disabled}
      type={type}
      className={`${styles.btn} ${variant === "primary" && styles["btn-primary"]}
      ${variant === "warning-red" && styles["btn-warning-red"]}
      ${variant === "success" && styles["btn-success"]}
      ${variant === "navigation" && styles["btn-navigation"]}
      ${disabled && styles["disabled"]}
      ${props.isLoading && styles["btn-laoding"]}
      ${iconLeft && styles["btn-reverse"]}
      ${props.buttonList && styles["btn-default"]}
      ${styles[size || "large"]}`}
      onClick={() => {
        if (props.asyncAction) {
          (async () => {
            setIsLoading(true);
            await props.onClick?.();
            setIsLoading(false);
          })();
        } else {
          props.onClick?.();
        }
      }}
    >
      {icon}
      {props.buttonList && <ArrowDownIcon size={20} color="#fff" />}
      {text}
      {props.isLoading && (
        <div className={styles.loaderBox}>
          <Loader />
        </div>
      )}
    </button>
  );
}
