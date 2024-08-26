import React from "react";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import { Stack, Box, Typography } from "@mui/material";
import SendIcon from "@/assets/icons/SendIcon";
import Link from "next/link";

export default function QuickNavItem({ path, title, subtitle }: { path: string; title: string; subtitle: string }) {
  return (
    <Link href={path}>
      <Box
        sx={{
          width: "300px",
          height: "auto",
          borderRadius: "8px",
          bgcolor: "hsl(0, 0%, 98%)",
          p: 1,
          "&:hover": {
            backgroundColor: "hsl(0, 0%, 96%)",
          },
        }}
      >
        <Stack sx={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
          <Box
            sx={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "#07195210",
            }}
          >
            {/* <PeopleIcon size={16} color="#12141a" /> */}
            <SendIcon size={20} color="#12141a" />
          </Box>
          <Stack sx={{ flexDirection: "column", justifyContent: "center" }}>
            <Typography variant="caption" fontWeight="400" color="#484848">
              {title}
            </Typography>
            <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
              <Typography variant="caption" color="#484848" fontWeight="300">
                {subtitle}
              </Typography>
            </Stack>
          </Stack>
          <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
            <ArrowRightIcon color="#484848" size={16} />
          </Box>
        </Stack>
      </Box>
    </Link>
  );
}
