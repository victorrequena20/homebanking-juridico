import React from "react";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFoundData({
  title,
  withOutBack,
  mt,
}: {
  title?: string;
  withOutBack?: boolean;
  mt?: number;
}) {
  const router = useRouter();
  return (
    <Stack sx={{ alignItems: "center", justifyContent: "center", height: "100%", mt: mt || 32 }}>
      <Image width={140} height={140} alt="" src="/assets/images/daw.svg" />
      <Typography variant="body2" fontWeight="400" color="var(--secondaryText)">
        {title || "No hay datos que mostrar."}
      </Typography>
      {!withOutBack && (
        <Stack
          sx={{ flexDirection: "row", mx: "auto", justifyContent: "center", alignItems: "center", gap: 0.5, mt: 1 }}
          onClick={() => router.back()}
        >
          <ArrowLeftIcon color="#606778" size={20} />
          <Typography
            variant="body2"
            sx={{ textDecoration: "underline", textDecorationColor: "#606778", cursor: "pointer" }}
          >
            Volver
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
