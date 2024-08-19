import Breadcrumbs from "@/components/Breadcrumbs";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

export default function ClientDetails() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "var(--darkBg)",
      }}
    >
      <Grid
        container
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: "#FAFAFA",
          borderTop: "8px solid var(--darkBg)",
          borderBottom: "8px solid var(--darkBg)",
          borderLeft: "8px solid var(--darkBg)",
          borderRight: "8px solid var(--darkBg)",
          borderRadius: "24px",
          overflow: "hidden",
        }}
      >
        <Grid item xs={12} sx={{ pt: 2 }}>
          <Stack
            sx={{ width: "100%", borderBottom: "1px solid #bac3d480", alignItems: "space-between", px: 4, py: 0.5 }}
          >
            <Breadcrumbs
              items={[{ title: "Inicio", href: "/dashboard" }, { title: "Institución" }, { title: "Clientes" }]}
            />
          </Stack>
        </Grid>
        <Grid xs={1.8} sx={{ borderRight: "1px solid #bac3d480", height: "100%", p: 2 }}>
          <Box
            sx={{
              borderRadius: "8px",
              py: 1,
              px: 2,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              cursor: "pointer",
              backgroundColor: "#f2f4f7",
            }}
            // onClick={() => router.push("/dashboard")}
          >
            <Typography variant="body2" fontWeight="400" color="var(--secondaryText)">
              General
            </Typography>
          </Box>
        </Grid>

        <Grid xs={10.2} sx={{ px: 10, pt: 6 }}>
          <Stack sx={{ alignItems: "center", width: "100%" }}>
            <Stack
              sx={{
                // bgcolor: "#f2f4f7",
                backgroundImage: "linear-gradient(135deg, #fff 0%, #f2f4f7 80%)",
                width: "100%",
                height: "300px",
                borderRadius: "16px",
                justifyContent: "center",
                boxShadow: "0px 12px 36px -4px #10182809",
              }}
            >
              <Stack sx={{ px: 4, flexDirection: "row", alignItems: "center" }}>
                <Stack sx={{ alignItems: "center" }}>
                  <Image
                    width={160}
                    height={160}
                    src="/assets/images/profile.jpg"
                    style={{ borderRadius: "100px", objectFit: "cover" }}
                    alt="Profile"
                  />
                  <Typography variant="caption" fontWeight="300" color="var(--secondaryText)" sx={{ mt: 1 }}>
                    Ver firma
                  </Typography>
                </Stack>
                <Stack>
                  <Stack sx={{ pl: 4, gap: 1.5, py: 1 }}>
                    <Stack sx={{ flexDirection: "row", gap: 1 }}>
                      <Typography variant="body2" color="var(--secondaryText)">
                        Nombre:
                      </Typography>
                      <Typography variant="body2" color="var(--text)">
                        Jodefina Rodriguez
                      </Typography>
                    </Stack>
                    <Stack sx={{ flexDirection: "row", gap: 1 }}>
                      <Typography variant="body2" color="var(--secondaryText)">
                        Oficina:
                      </Typography>
                      <Typography variant="body2" color="var(--text)">
                        Head Office
                      </Typography>
                    </Stack>
                    <Stack sx={{ flexDirection: "row", gap: 1 }}>
                      <Typography variant="body2" color="var(--secondaryText)">
                        Documento:
                      </Typography>
                      <Typography variant="body2" color="var(--text)">
                        V 31.039.208
                      </Typography>
                    </Stack>
                    <Stack sx={{ flexDirection: "row", gap: 1 }}>
                      <Typography variant="body2" color="var(--secondaryText)">
                        Asesor:
                      </Typography>
                      <Typography variant="body2" color="var(--text)">
                        Castillo, Daniel
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack sx={{ pl: 4, gap: 1.5, pt: 3 }}>
                    <Stack sx={{ flexDirection: "row", gap: 1 }}>
                      <Typography variant="body2" color="var(--secondaryText)">
                        Número de teléfono:
                      </Typography>
                      <Typography variant="body2" color="var(--text)">
                        0412-15-4757
                      </Typography>
                    </Stack>
                    <Stack sx={{ flexDirection: "row", gap: 1 }}>
                      <Typography variant="body2" color="var(--secondaryText)">
                        Correo electrónico:
                      </Typography>
                      <Typography variant="body2" color="var(--text)">
                        requenade@gmail.com
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
