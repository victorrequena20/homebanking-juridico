export interface IButtonProps {
  text?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "success" | "warning-red" | "navigation";
  size?: "small" | "medium" | "large";
  icon?: React.ReactNode;
  disabled?: boolean;
  iconLeft?: boolean;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  isLoading?: boolean;
  buttonList?: boolean;
  asyncAction?: boolean;
}
