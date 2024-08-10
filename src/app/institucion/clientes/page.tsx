import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Stack, Typography } from "@mui/material";

export default function Clients() {
  return (
    <Grid container sx={{ backgroundColor: "hsl(0, 0%, 10%)", width: "100%", height: "100vh", py: 1, pr: 1 }}>
      <Grid md={2} sx={{ bgcolor: "hsl(0, 0%, 10%)", px: 2, pt: 2 }}>
        <Typography variant="body1" color="#fff">
          Banco de Digital de Caracas
        </Typography>
        <Stack sx={{ mt: 4 }}>
          <Stack>
            <Box sx={{ backgroundColor: "hsl(0, 0%, 12%)", borderRadius: "8px", py: 1, px: 2 }}>
              <Typography variant="body2" color="#fff">
                Institución
              </Typography>
            </Box>
            <Stack sx={{ mt: 1, pl: 4 }}>
              <Box sx={{ borderRadius: "8px", py: 1, px: 2, bgcolor: "hsl(0, 0%, 12%)" }}>
                <Typography variant="body2" fontWeight="200" color="#fff">
                  Clientes
                </Typography>
              </Box>
              <Box sx={{ borderRadius: "8px", py: 1, px: 2 }}>
                <Typography variant="body2" fontWeight="200" color="#fff">
                  Grupos
                </Typography>
              </Box>
              <Box sx={{ borderRadius: "8px", py: 1, px: 2 }}>
                <Typography variant="body2" fontWeight="200" color="#fff">
                  Centros
                </Typography>
              </Box>
            </Stack>
          </Stack>
          <Stack sx={{ mt: 1.5 }}>
            <Box sx={{ borderRadius: "8px", py: 1, px: 2 }}>
              <Typography variant="body2" color="#fff">
                Cuentas
              </Typography>
            </Box>
          </Stack>
          <Stack sx={{ mt: 1.5 }}>
            <Box sx={{ borderRadius: "8px", py: 1, px: 2 }}>
              <Typography variant="body2" color="#fff">
                Reportes
              </Typography>
            </Box>
          </Stack>
          <Stack sx={{ mt: 1.5 }}>
            <Box sx={{ borderRadius: "8px", py: 1, px: 2 }}>
              <Typography variant="body2" color="#fff">
                Administrador
              </Typography>
            </Box>
          </Stack>
          <Stack sx={{ mt: 1.5 }}>
            <Box sx={{ borderRadius: "8px", py: 1, px: 2 }}>
              <Typography variant="body2" color="#fff">
                Autoservicio
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Grid>
      <Grid md={10} sx={{ bgcolor: "#FAFAFA", borderRadius: 8 }}></Grid>
    </Grid>
  );
}
