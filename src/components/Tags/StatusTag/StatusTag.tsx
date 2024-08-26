import React from "react";
import { Box, Typography } from "@mui/material";
import { StatusTagProps } from "./StatusTagProps";
import CheckIcon from "@/assets/icons/Checkicon";
import { GridCloseIcon } from "@mui/x-data-grid";

export default function StatusTag({
  isActive,
  mode = "tag",
  trueText = "Activo",
  falseText = "Inactivo",
}: StatusTagProps) {
  if (mode === "tag") {
    return (
      <Box sx={{ height: "100%", alignItems: "center", display: "flex" }}>
        <Box
          sx={{
            bgcolor: isActive ? "#ECFDF3" : "#FEF3F2",
            width: "80px",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            gap: 0.5,
            borderRadius: "28px",
            border: `1px solid ${isActive ? "#067647" : "#B42318"}`,
          }}
        >
          {trueText === "Activo" && falseText === "Inactivo" && (
            <Box
              sx={{ width: "6px", height: "6px", borderRadius: "20px", bgcolor: isActive ? "#067647" : "#B42318" }}
            />
          )}
          <Typography variant="caption" fontWeight="300" color={isActive ? "#067647" : "#B42318"}>
            {isActive ? trueText : falseText}
          </Typography>
        </Box>
      </Box>
    );
  }

  if (mode === "circle") {
    return (
      <Box sx={{ height: "100%", alignItems: "center", display: "flex" }}>
        <Box
          sx={{
            bgcolor: isActive ? "#ECFDF3" : "#FEF3F2",
            width: "24px",
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "30px",
            border: `1px solid ${isActive ? "#067647" : "#B42318"}`,
          }}
        >
          {isActive ? (
            <CheckIcon size={12} color="#067647" />
          ) : (
            <GridCloseIcon sx={{ color: "#B42318", fontSize: "15.5px" }} />
          )}
        </Box>
      </Box>
    );
  }
}
