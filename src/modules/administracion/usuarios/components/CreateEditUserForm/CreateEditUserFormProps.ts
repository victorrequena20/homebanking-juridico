import { User } from "@/types/User.types";

export interface ICreateEditUserFormProps {
  user?: User | null;
  close?: () => void;
}
