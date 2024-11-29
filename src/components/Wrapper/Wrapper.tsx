"use client";
import React from "react";
import { Box, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Loader from "../Loader";

export default function Wrapper({ children, isLoading }: { children: React.ReactNode; isLoading?: boolean }) {
  return (
    <Grid
      xs={12}
      md={10.2}
      sx={{
        bgcolor: "#FFF",
        // borderRadius: "24px",
        pt: { xs: 3, md: 1 },
        maxHeight: "100%",
        minHeight: { xs: "100%", md: "auto" },
        overflow: "auto",
        pb: 4,
        px: { xs: 3, md: 0 },
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            maxWidth: {
              md: "100%",
            },
            height: "100%",
            minHeight: { xs: "100%", md: "auto" },
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
