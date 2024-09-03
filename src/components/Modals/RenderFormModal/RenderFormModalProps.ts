import { SxProps } from "@mui/material";

export interface IRenderFormModalProps {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  sx?: SxProps;
}
