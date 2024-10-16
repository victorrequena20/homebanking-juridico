import React from "react";
import { Grid, Stack, Typography } from "@mui/material";

/**
 * Renders a section text separator component.
 * This component displays a text separator with the provided label.
 * @param label - The label to display in the text separator.
 */
export default function SectionTextSeparator({ label }: { label: string }) {
  return (
    <Grid item xs={12}>
      <Stack sx={{ flexDirection: "row", gap: 3, justifyContent: "center" }}>
        <Stack sx={{ flex: 1, alignItems: "center", mt: 0 }}>
          <Typography variant="body1" color="var(--text)">
            {label}
          </Typography>
        </Stack>
      </Stack>
    </Grid>
  );
}
