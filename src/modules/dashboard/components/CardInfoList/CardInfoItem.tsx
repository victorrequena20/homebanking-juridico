import PeopleIcon from "@/assets/icons/PeopleIcon";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";

export default function CardInfoItem({
  title,
  value,
  percentage,
  icon,
}: {
  title: string;
  value: string;
  percentage?: string;
  icon: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "300px",
        height: "auto",
        borderRadius: "16px",
        backgroundColor: "#fff",
        p: 2,
      }}
    >
      <Stack sx={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
        <Box
          sx={{
            width: "48px",
            height: "48px",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#07195210",
          }}
        >
          {icon}
        </Box>
        <Stack sx={{ flexDirection: "column", justifyContent: "center" }}>
          <Typography variant="body1" fontWeight="300">
            {title}
          </Typography>
          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
            <Typography variant="h5" fontWeight="600">
              {value}
            </Typography>
            {percentage && (
              <Typography variant="caption" fontWeight="400" color="#067647">
                +{percentage}%
              </Typography>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
