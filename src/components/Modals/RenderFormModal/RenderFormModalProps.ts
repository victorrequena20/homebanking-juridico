export interface IRenderFormModalProps {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  title?: string;
  children?: React.ReactNode;
}
