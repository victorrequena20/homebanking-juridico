"use client";
import React from "react";
import { Box, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Loader from "../Loader";

export default function Wrapper({ children, isLoading }: { children: React.ReactNode; isLoading?: boolean }) {
  return (
    <Grid
      md={10}
      sx={{
        bgcolor: "#FAFAFA",
        borderRadius: 8,
        pt: 6,
        maxHeight: "100%",
        overflow: "auto",
        pb: 4,
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader size="40" color="#484848" />
        </Box>
      ) : (
        <Stack sx={{ maxWidth: "1200px", mx: "auto", px: 10 }}>{children}</Stack>
      )}
    </Grid>
  );
}
