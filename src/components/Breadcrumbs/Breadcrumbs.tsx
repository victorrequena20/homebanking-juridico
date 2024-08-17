import React from "react";
import { BreadcrumbsProps, IBreadcrumbItem } from "./BreadcrumbsProps";
import { Stack, Typography } from "@mui/material";
import { Breadcrumbs as BreadcrumbsMUI } from "@mui/material";
import Link from "next/link";

export default function Breadcrumbs({ title, items }: BreadcrumbsProps) {
  return (
    <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <Stack>
        <Typography variant="h4">{title}</Typography>
        <BreadcrumbsMUI aria-label="breadcrumb" sx={{ mt: 1 }}>
          {items?.map((item: IBreadcrumbItem) => {
            if (item?.href) {
              return (
                <Link key={item.href} color="inherit" href={item?.href}>
                  <Typography variant="body2">{item.title}</Typography>
                </Link>
              );
            } else {
              return (
                <Typography key={item.title} variant="body2">
                  {item.title}
                </Typography>
              );
            }
          })}
        </BreadcrumbsMUI>
      </Stack>
    </Stack>
  );
}
