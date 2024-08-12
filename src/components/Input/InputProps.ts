import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

export interface InputProps {
  label?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  isValidField?: boolean;
  hint?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
}
