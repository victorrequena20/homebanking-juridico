import { Grid } from "@mui/material";
import React from "react";

function InputResponsiveContainer({ children }: { children: React.ReactNode }) {
  return (
    <Grid item sx={{ maxWidth: "392px", width: { xs: "100%" } }}>
      {children}
    </Grid>
  );
}

export default InputResponsiveContainer;
