export interface ToggleProps {
  isChecked?: boolean;
  setIsChecked?: (isChecked: boolean) => void;
  label?: string;
  size?: string;
  toggleLeft?: boolean;
  secondaryEffect?: () => void;
}
