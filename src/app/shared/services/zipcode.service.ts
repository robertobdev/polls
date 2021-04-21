import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ZipcodeAPI } from '../interfaces/zipcode.interface';

@Injectable({
  providedIn: 'root',
})
export class ZipcodeService {
  private ZIPCODE_API = (zipcode: string) =>
    `https://viacep.com.br/ws/${zipcode}/json/`;

  constructor(private httpClient: HttpClient) {}

  getCep(zipcode: string): Promise<ZipcodeAPI> {
    return this.httpClient
      .get<ZipcodeAPI>(this.ZIPCODE_API(zipcode))
      .toPromise();
  }
}
