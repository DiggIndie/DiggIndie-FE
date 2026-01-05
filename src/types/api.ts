export interface ApiResponse<T> {
  statusCode: number;
  isSuccess: boolean;
  message: string;
  payload: T;
}
