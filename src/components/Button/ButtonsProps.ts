export interface IButtonProps {
  text?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "success" | "warning-red";
  size?: "small" | "medium" | "large";
}
