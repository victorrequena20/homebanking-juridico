import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

export interface IInputSelectProps {
  label?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  isValidField?: boolean;
  hint?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  options?: { label: string; value: string }[];
  withCheckbox?: boolean;
}
