"use client";
import { ReactNode } from "react";
import {
  createTheme,
  ThemeOptions,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import palette from "./palette";
// import palette from "./palette";
// import typography from "./typography";
// import breakpoints from "./breakpoints";
// import componentsOverride from "./overrides";
// import shadows from "./shadows";

type Props = {
  children: ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const themeOptions: ThemeOptions = {
    palette: palette.light,
  };

  const theme = createTheme(themeOptions);

  // theme.components = componentsOverride(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
