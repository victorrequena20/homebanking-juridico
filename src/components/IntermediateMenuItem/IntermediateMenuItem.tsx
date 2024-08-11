import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Stack } from "@mui/material";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import { Typography } from "@mui/material";
import ChartSquareIcon from "@/assets/icons/ChartSquareIcon";
import { IntermediateMenuItemProps } from "./IntermediateMenuItemProps";

export default function IntermediateMenuItem({ title, subtitle, path, icon }: IntermediateMenuItemProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        backgroundColor: "#fff",
        width: "100%",
        minWidth: "340px",
        maxWidth: "340px",
        height: "80px",
        maxHeight: "80px",
        borderRadius: 2,
        px: 2,
        py: 3,
        border: "1px solid rgb(240, 240, 240)",
        cursor: "pointer",
        "&:hover": {
          border: "1px solid #153075",
        },
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "auto",
        }}
      >
        <Stack sx={{ height: "100%", flexDirection: "row", justifyContent: "center" }}>
          <Stack sx={{ flexDirection: "row", columnGap: 1, alignItems: "center" }}>{icon}</Stack>
          <Stack sx={{ flexDirection: "column", alignItems: "flex-start", justifyContent: "center", ml: 2 }}>
            <Typography variant="body2" fontWeight="500" color="#12141a">
              {title}
            </Typography>
            <Typography variant="caption" color="#606778" maxWidth="34ch" sx={{ mt: 0.5 }}>
              {subtitle}
            </Typography>
          </Stack>
        </Stack>
        <Box
          sx={{
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": {
              bgcolor: "#F6F5F2",
            },
          }}
        >
          <ArrowRightIcon size={18} color="#000" />
        </Box>
      </Stack>
    </Box>
  );
}
