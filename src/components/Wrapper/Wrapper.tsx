import React from "react";
import { Stack } from "@mui/material";

export default function Wrapper({ children }: any) {
  return <Stack sx={{ maxWidth: "1200px", mx: "auto" }}>{children}</Stack>;
}
