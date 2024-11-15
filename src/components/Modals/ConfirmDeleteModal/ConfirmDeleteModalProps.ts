export interface ConfirmDeleteModalProps {
  title?: string;
  actionCallback?: () => void;
  buttonActionCallback?: () => void;
  buttonType?: "normal" | "action";
  buttonText?: string;
  confirmText?: string;
  icon: any
}
