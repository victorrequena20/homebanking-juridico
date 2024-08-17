import React from "react";
import { BreadcrumbsProps, IBreadcrumbItem } from "./BreadcrumbsProps";
import { Stack, Typography } from "@mui/material";
import { Breadcrumbs as BreadcrumbsMUI } from "@mui/material";
import Link from "next/link";

export default function Breadcrumbs({ title, items }: BreadcrumbsProps) {
  return (
    <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <Stack>
        <BreadcrumbsMUI aria-label="breadcrumb" sx={{ mt: 1, fontSize: "12px", fontWeight: "300" }}>
          {items?.map((item: IBreadcrumbItem) => {
            if (item?.href) {
              return (
                <Link key={item.href} color="inherit" href={item?.href}>
                  <Typography variant="caption" fontWeight="400" color="#606778">
                    {item.title}
                  </Typography>
                </Link>
              );
            } else {
              return (
                <Typography key={item.title} variant="caption" fontWeight="400" color="#3d424d">
                  {item.title}
                </Typography>
              );
            }
          })}
        </BreadcrumbsMUI>
        <Typography variant="h5" fontSize="28px" sx={{ mt: 2, fontWeight: "500" }}>
          {title}
        </Typography>
      </Stack>
    </Stack>
  );
}
