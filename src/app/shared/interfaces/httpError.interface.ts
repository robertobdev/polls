export interface IHttpErro {
  code: number;
  message: string;
  data: IData;
}

interface IData {
  [key: string]: string;
}
