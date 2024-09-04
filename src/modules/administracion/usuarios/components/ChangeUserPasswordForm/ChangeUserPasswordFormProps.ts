export interface IChangeUserPasswordFormProps {
  userId?: string;
  fromAdmin?: boolean;
  secondaryAction?: () => void;
}
