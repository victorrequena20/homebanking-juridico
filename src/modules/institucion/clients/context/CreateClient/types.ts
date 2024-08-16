export interface ICreateClientContext {
  step?: number;
  clientGeneralData?: any;
  templateData: any;
  setStep?: (step: number) => void;
  setClientGeneralData?: (clientGeneralData: any) => void;
  clientFamilyMembers: any[];
  setClientFamilyMembers: (clientFamilyMembers: any[]) => void;
}
