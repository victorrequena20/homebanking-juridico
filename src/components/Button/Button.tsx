import React from "react";
import { IButtonProps } from "./ButtonsProps";
import { Button as ButtonMUI } from "@mui/material";

export default function Button(props: IButtonProps) {
  const { text, ...rest } = props;
  return (
    <ButtonMUI
      sx={{
        display: "flex",
        backgroundColor: "var(--primaryColor)",
      }}
      {...rest}
    >
      {text}
    </ButtonMUI>
  );
}
