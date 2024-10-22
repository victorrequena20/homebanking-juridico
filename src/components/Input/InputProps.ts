import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

export interface InputProps {
  label?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  isValidField?: boolean;
  hint?: any;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  defaultValue?: string;
  width?: string;
  maxLength?: number;
  disabled?: boolean;
}
