export interface ApiResponse<T = any> {
  data?: T;
  status: number;
}
