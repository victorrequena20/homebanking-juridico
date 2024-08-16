import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";

interface Props {
  text?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function StepBox({ text, isActive, onClick }: Props) {
  return (
    <Box
      sx={{
        width: "260px",
        maxWidth: "260px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          minWidth: "48px",
          width: "48px",
          height: "48px",
          minHeight: "48px",
          backgroundColor: isActive ? "#153075" : "#cccccc80",
          borderRadius: "42px",
          outline: `1px solid ${isActive ? "#153075" : "transparent"}`,
          outlineOffset: "3px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "16px", height: "16px", borderRadius: "10px", bgcolor: "#fff" }} />
      </Box>
      <Typography textAlign="center" variant="body2" color="#484848" sx={{ mt: 1 }}>
        {text}
      </Typography>
    </Box>
  );
}
