export interface ApiResponse<T> {
  statusCode: number;
  isSuccess: boolean;
  message: string;
  payload: T;
}
interface SignupResponse {
  isSuccess: boolean;
  payload: {
    accessToken: string;
    userId: string;
    isNew: boolean;
  };
  message: string;
}
