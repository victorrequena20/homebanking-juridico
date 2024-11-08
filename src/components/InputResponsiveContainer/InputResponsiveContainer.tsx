import { Grid, Stack } from "@mui/material";
import React from "react";

function InputResponsiveContainer({ children, empty }: { children?: React.ReactNode; empty?: boolean }) {
  return (
    <Grid item sx={{ maxWidth: "392px", width: { xs: "100%" }, justifyContent: "center", alignContent: "center" }}>
      {empty ? <Stack sx={{ width: "392px" }} /> : <>{children}</>}
    </Grid>
  );
}

export default InputResponsiveContainer;
