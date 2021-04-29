export interface HttpResponse {
  code: number;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}
export interface HttpErrorResponse extends HttpResponse {
  data: HttpErrorrData[];
}
export interface LoginResponse {
  access_token: string;
}

interface HttpErrorrData {
  [key: string]: string;
}
