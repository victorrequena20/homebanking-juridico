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
        bgcolor: "#FCFCFD",
        borderRadius: 8,
        pt: 1,
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
        <Stack
          sx={{
            maxWidth: {
              md: "900px",
              lg: "900px",
              xl: "1900px",
            },
            mx: "auto",
            px: { md: 6, lg: 6, xl: 6 },
          }}
        >
          {children}
        </Stack>
      )}
    </Grid>
  );
}
