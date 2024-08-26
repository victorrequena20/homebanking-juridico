import React from "react";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { toast } from "sonner";
import ClipboardIcon from "@/assets/icons/ClipboardIcon";

export default function AccountNumberCell({ accountNo }: { accountNo: string }) {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <Stack
      sx={{ height: "100%", flexDirection: "row", alignItems: "center" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Typography variant="caption">{accountNo}</Typography>
      <Tooltip title="Copiar número de cuenta" sx={{ opacity: isHovered ? 1 : 0 }}>
        <IconButton
          size="small"
          onClick={e => {
            e.stopPropagation();
            navigator.clipboard.writeText(accountNo);
            toast.success("Litecore ha copiado al portapapeles");
          }}
        >
          <ClipboardIcon size={14} color="#484848" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
