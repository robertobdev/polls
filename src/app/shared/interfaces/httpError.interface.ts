export interface HttpError {
  code: number;
  message: string;
  data: HttpErrorrData[];
}
export interface LoginResponse {
  access_token: string;
}

interface HttpErrorrData {
  [key: string]: string;
}
