export interface ApiResponse<T = any> {
  data?: T;
  status: number;
}

export interface IKeyValue {
  label: string;
  value: string | number;
}
