export interface HttpError {
  code: number;
  message: string;
  data: HttpErrorrData;
}

interface HttpErrorrData {
  [key: string]: string;
}
