import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IZipcodeAPI } from '../interfaces/zipcode.interface';

@Injectable({
  providedIn: 'root',
})
export class ZipcodeService {
  private ZIPCODE_API = (zipcode: string) =>
    `https://viacep.com.br/ws/${zipcode}/json/`;

  constructor(private httpClient: HttpClient) {}

  getCep(zipcode: string): Promise<IZipcodeAPI> {
    return this.httpClient
      .get<IZipcodeAPI>(this.ZIPCODE_API(zipcode))
      .toPromise();
  }
}
