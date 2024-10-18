export interface ConfirmActiveHolidayModalProps {
  title?: string;
  actionCallback?: () => void;
  buttonActionCallback?: () => void;
  buttonType?: "normal" | "action";
  buttonText?: string;
}
