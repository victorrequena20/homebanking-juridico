import React from "react";
import Wrapper from "@/components/Wrapper";
import ButtonBack from "@/components/ButtonBack";
import { Box, Stack, Typography } from "@mui/material";
import CreateClientForm from "@/modules/clients/components/CreateClientForm";

export default function CreateClient() {
  return (
    <Wrapper>
      <ButtonBack />

      {/* Stepper */}
      <Stack sx={{ mt: 5, flexDirection: "row" }}>
        <Box
          sx={{
            width: "120px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              minWidth: "48px",
              width: "48px",
              height: "48px",
              minHeight: "48px",
              backgroundColor: "#153075",
              borderRadius: "42px",
              outline: "1px solid #153075",
              outlineOffset: "3px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "16px", height: "16px", borderRadius: "10px", bgcolor: "#fff" }} />
          </Box>
          <Typography variant="body2" color="#484848" sx={{ mt: 1 }}>
            General
          </Typography>
        </Box>
        <Box sx={{ width: "100%", height: "2px", bgcolor: "#ccc", mt: 3 }} />
        <Box
          sx={{
            width: "120px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              minWidth: "48px",
              width: "48px",
              height: "48px",
              minHeight: "48px",
              backgroundColor: "#cccccc80",
              borderRadius: "42px",
              outlineOffset: "3px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "16px", height: "16px", borderRadius: "10px", bgcolor: "#fff" }} />
          </Box>
          <Typography variant="body2" color="#484848" sx={{ mt: 1, textAlign: "center" }}>
            Miembros de la familia
          </Typography>
        </Box>
      </Stack>

      <Stack sx={{ mt: 3, px: 4 }}>
        <CreateClientForm />
      </Stack>
    </Wrapper>
  );
}
