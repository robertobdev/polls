import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ValidateRequired } from 'anutils/validators';
import { debounceTime } from 'rxjs/operators';
import { ZipcodeAPI } from 'src/app/shared/interfaces/zipcode.interface';
import { ZipcodeService } from 'src/app/shared/services/zipcode.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { User } from '../../users/interfaces/user.interface';
import { USER_GRAPHQL_TYPES } from '../../users/interfaces/users-graphql-type.enum';
import { UsersService } from '../../users/services/users.service';
import { Address } from '../interfaces/address.interface';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent {
  addressFormArray: FormArray;
  user: User;

  constructor(
    private _zipcodeService: ZipcodeService,
    private _userService: UsersService,
    private _authService: AuthService,
    private _profileService: ProfileService
  ) {
    this.user = this._authService.user.value as User;
    this.addressFormArray = new FormArray([]);
    void this._userService
      .getUser(this.user.id, USER_GRAPHQL_TYPES.ADDRESSES)
      .subscribe(({ data }) => {
        const user = data.user;
        console.log(user.addresses);
        //TODO: IF not existe add one
        for (const address of user.addresses || []) {
          this.addNewAddress(address);
        }
      });
  }

  get addressFormGroups(): FormGroup[] {
    return this.addressFormArray.controls as FormGroup[];
  }

  addNewAddress(address: Address | null = null): void {
    const contact = new FormGroup({
      id: new FormControl(address?.id, []),
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

  removeAddress(index: number): void {
    const addressId = this.addressFormGroups[index].get('id')?.value as number;
    if (!index || this.addressFormArray.invalid) {
      this.addressFormArray.removeAt(index);
      return;
    }
    void this._profileService.deleteAddress(addressId).then(() => {
      this.addressFormArray.removeAt(index);
    });
  }

  saveAddresses(): void {
    const addresses = this.addressFormArray.getRawValue();
    void this._profileService
      .updateAddresses(this.user.id, addresses)
      .then(({ data }) => {
        const resultAddresses = data as Address[];
        for (const [index, address] of resultAddresses.entries()) {
          console.log(index, address);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          this.addressFormGroups[index].patchValue(address);
        }
      });
  }
}
