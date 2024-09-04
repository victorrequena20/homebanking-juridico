export interface StatusTagProps {
  isActive: boolean;
  mode?: "tag" | "circle";
  trueText?: string;
  falseText?: string;
  statusVariant?: "Active" | "Inactive" | "Closed" | "Pending";
}
