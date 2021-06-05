import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ValidateRequired } from 'anutils/validators';
import { debounceTime } from 'rxjs/operators';
import { ZipcodeAPI } from 'src/app/shared/interfaces/zipcode.interface';
import { ZipcodeService } from 'src/app/shared/services/zipcode.service';
import { USER_GRAPHQL_TYPES } from '../../users/interfaces/users-graphql-type.enum';
import { UsersService } from '../../users/services/users.service';
import { Address } from '../interfaces/address.interface';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent {
  addressFormArray: FormArray;

  constructor(
    private _zipcodeService: ZipcodeService,
    private _userService: UsersService
  ) {
    this.addressFormArray = new FormArray([]);
    void this._userService
      .getUser(1, USER_GRAPHQL_TYPES.ADDRESSES)
      .subscribe(({ data }) => {
        const user = data.user;
        console.log(user.addresses);
        for (const address of user.addresses || []) {
          this.addNewAddress(address);
        }
        // data.user.addresses.map();
      });
  }

  get addressFormGroups(): FormGroup[] {
    return this.addressFormArray.controls as FormGroup[];
  }

  addNewAddress(address: Address | null = null): void {
    const contact = new FormGroup({
      zipcode: new FormControl(address?.zipcode, [ValidateRequired]),
      number: new FormControl(address?.number, [ValidateRequired]),
      street: new FormControl({ value: address?.street, disabled: true }, [
        ValidateRequired,
      ]),
      neighborhood: new FormControl(
        { value: address?.neighborhood, disabled: true },
        [ValidateRequired]
      ),
      city: new FormControl({ value: address?.city, disabled: true }, [
        ValidateRequired,
      ]),
      state: new FormControl({ value: address?.state, disabled: true }, [
        ValidateRequired,
      ]),
      country: new FormControl({ value: 'Brasil', disabled: true }, [
        ValidateRequired,
      ]),
      complement: new FormControl(address?.complement),
    });
    contact
      .get('zipcode')
      ?.valueChanges.pipe(debounceTime(1000))
      .subscribe((value) => {
        this.getApiAddress(contact, value);
      });
    this.addressFormArray.push(contact);
  }

  getApiAddress(contact: FormGroup, zipcode: string): void {
    if (!zipcode || zipcode.length < 9) {
      return;
    }
    void this._zipcodeService.getCep(zipcode).then((zipcode: ZipcodeAPI) => {
      const { bairro, complemento, localidade, logradouro, uf } = zipcode;
      const zipcodeTransform = {
        city: localidade,
        state: uf,
        neighborhood: bairro,
        complement: complemento,
        street: logradouro,
      };
      contact.patchValue(zipcodeTransform);
    });
  }

  removeContact(index: number): void {
    if (!index) {
      return;
    }
    this.addressFormArray.removeAt(index);
  }

  saveAddresses(): void {
    console.log(this.addressFormArray.getRawValue());
  }
}
