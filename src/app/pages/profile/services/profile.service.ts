/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Address } from '../../users/interfaces/address.interface';
import { Contact } from '../../users/interfaces/contact.interface';
import { ChangePassword } from '../interfaces/change-password.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  BASEURL = environment.baseUrl;

  constructor(private _httpClient: HttpClient) {}

  updateContacts(userId: number, contacts: Contact[]): Promise<any> {
    const user = {
      id: userId,
      contacts,
    };
    return this._httpClient
      .patch(`${this.BASEURL}/users/contacts/${userId}`, user)
      .toPromise();
  }

  deleteContact(contactId: number): Promise<any> {
    return this._httpClient
      .delete(`${this.BASEURL}/users/contacts/${contactId}`)
      .toPromise();
  }

  updateAddresses(userId: number, addresses: Address[]): Promise<any> {
    const user = {
      id: userId,
      addresses,
    };
    return this._httpClient
      .patch(`${this.BASEURL}/users/addresses/${userId}`, user)
      .toPromise();
  }

  changePassword(userId: number, passwords: ChangePassword): Promise<any> {
    return this._httpClient
      .patch(`${this.BASEURL}/users/change-password/${userId}`, passwords)
      .toPromise();
  }

  deleteAddress(addressId: number): Promise<any> {
    return this._httpClient
      .delete(`${this.BASEURL}/users/addresses/${addressId}`)
      .toPromise();
  }
}
