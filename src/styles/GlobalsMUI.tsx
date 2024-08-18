import { SxProps } from "@mui/material";

export const detailRowStyles: SxProps = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  mt: 3,
};

export const detailRowWithAction: SxProps = {
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "flex-end",
  borderBottom: "1px solid #cccccc80",
  pb: 2,
  mt: 5,
};

export const flexRowCenter: SxProps = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};
