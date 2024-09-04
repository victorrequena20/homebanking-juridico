import React from "react";
import { Stack, SxProps, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { ToggleProps } from "./ToggleProps";

export default function Toggle({
  isChecked,
  setIsChecked,
  label,
  size = "big",
  toggleLeft,
  secondaryEffect,
}: ToggleProps) {
  const stackContainerStyles: SxProps = {
    flexDirection: !toggleLeft ? "row-reverse" : "row",
    alignItems: "center",
    gap: "20px",
  };
  const toggleBodyStyles: SxProps = {
    width: size === "small" ? "70px" : "89px",
    height: size === "small" ? "24px" : "24px",
    backgroundColor: isChecked ? "#153075" : "#ccc",
    borderRadius: "40px",
    position: "relative",
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };
  const toggleBallStyles: SxProps = {
    boxShadow: "0px 8px 16px 0px #2636990A",
    border: "1px solid #E9E9E9",
    width: size === "small" ? "16px" : "32px",
    height: size === "small" ? "16px" : "32px",
    borderRadius: "50%",
    backgroundColor: isChecked ? "#fff" : "#fff",
    position: "absolute",
    [isChecked ? "right" : "left"]: 3,
    cursor: "pointer",
  };

  function handleChecked() {
    setIsChecked && setIsChecked(!isChecked);
    secondaryEffect && secondaryEffect();
  }

  return (
    <Stack sx={stackContainerStyles}>
      <Box sx={toggleBodyStyles} onClick={handleChecked}>
        <Box sx={toggleBallStyles} />
      </Box>
      {label && (
        <Typography variant="body2" sx={{ textTransform: "none" }} color="common.black" fontWeight="200">
          {label}
        </Typography>
      )}
    </Stack>
  );
}
