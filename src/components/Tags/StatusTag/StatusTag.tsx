import React from "react";
import { Box, Typography } from "@mui/material";
import { StatusTagProps } from "./StatusTagProps";
import CheckIcon from "@/assets/icons/Checkicon";
import { GridCloseIcon } from "@mui/x-data-grid";

export default function StatusTag({ isActive, mode = "tag", trueText = "Activo", falseText = "Inactivo", statusVariant }: StatusTagProps) {
  const statusVariantConfig = {
    Closed: {
      bgColor: "",
      color: "",
      borderColor: "",
      dotColor: "#EF6820",
      text: "Cerrado",
    },
    Active: {
      bgColor: "#ECFDF3",
      color: "#067647",
      borderColor: "#067647",
      dotColor: "#067647",
      text: "Activo",
    },
    Inactive: {
      bgColor: "#FEF3F2",
      color: "#B42318",
      borderColor: "#B42318",
      dotColor: "#EF6820",
      text: "Inactivo",
    },
    Pending: {
      bgColor: "#F7900910",
      color: "#B54708",
      borderColor: "#FEDF89",
      dotColor: "#F79009",
      text: "Pendiente",
    },
  };

  if (mode === "tag") {
    return (
      <Box sx={{ height: "100%", alignItems: "center", display: "flex" }}>
        <Box
          sx={{
            bgcolor: statusVariant ? statusVariantConfig[statusVariant]?.bgColor : isActive ? "#ECFDF3" : "#FEF3F2",
            width: "80px",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            gap: 0.5,
            borderRadius: "28px",
            border: `1px solid ${statusVariant ? statusVariantConfig[statusVariant]?.borderColor : isActive ? "#067647" : "#B42318"}`,
          }}
        >
          {trueText === "Activo" && falseText === "Inactivo" && (
            <Box
              sx={{
                width: "6px",
                height: "6px",
                borderRadius: "20px",
                bgcolor: statusVariant ? statusVariantConfig[statusVariant]?.dotColor : isActive ? "#067647" : "#B42318",
              }}
            />
          )}
          <Typography variant="caption" fontWeight="300" color={statusVariant ? statusVariantConfig[statusVariant]?.color : isActive ? "#067647" : "#B42318"}>
            {statusVariant ? statusVariantConfig[statusVariant]?.text : isActive ? trueText : falseText}
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
          {isActive ? <CheckIcon size={12} color="#067647" /> : <GridCloseIcon sx={{ color: "#B42318", fontSize: "15.5px" }} />}
        </Box>
      </Box>
    );
  }
}
