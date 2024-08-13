"use client";
import React from "react";
import { Box } from "@mui/material";
import Button from "../Button";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import { useRouter } from "next/navigation";

export default function ButtonBack() {
  const router = useRouter();
  return (
    <Box>
      <Button
        icon={<ArrowLeftIcon size={18} color="#484848" />}
        size="small"
        variant="navigation"
        text="Volver"
        onClick={() => router.back()}
      />
    </Box>
  );
}
