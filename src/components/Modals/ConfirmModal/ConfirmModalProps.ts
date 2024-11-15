export interface ConfirmModalProps {
  title?: string;
  actionCallback?: () => void;
  closeCallback?: () => void;
  confirmText?: string;
  isOpen: boolean;
}
