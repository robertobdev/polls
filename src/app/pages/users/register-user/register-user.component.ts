import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  ValidateCpf,
  ValidateEmail,
  ValidateMatchPassword,
  ValidateRequired,
} from 'anutils/validators';
import { debounceTime } from 'rxjs/operators';
import {
  Zipcode,
  ZipcodeAPI,
} from 'src/app/shared/interfaces/zipcode.interface';
import { ZipcodeService } from 'src/app/shared/services/zipcode.service';
import { CONTACTYPE } from '../interfaces/contact_type.enum';
import { Person } from '../interfaces/person.interface';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class RegisterUserComponent implements OnInit {
  personFormGroup!: FormGroup;
  addressFormGroup!: FormGroup;
  contactFormGroup!: FormArray;
  maxDate: Date;
  contactTypes = Object.values(CONTACTYPE);
  id!: number;
  toCallCepApi = true;
  constructor(
    private _formBuilder: FormBuilder,
    private _zipcodeService: ZipcodeService,
    private _router: Router,
    private _activateRouter: ActivatedRoute,
    private _userService: UsersService
  ) {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear - 17, 11, 31);
    this._activateRouter.paramMap.subscribe((params: ParamMap) => {
      this.id = parseInt(params.get('id') as string);
      if (this.id) {
        void this._userService.getPerson(this.id).then((person: Person) => {
          const { addresses, contacts } = person;
          if (!person) {
            void this._router.navigateByUrl('/users');
            return;
          }
          this.personFormGroup.patchValue(person);
          if (addresses?.length) {
            this.toCallCepApi = false;
            this.addressFormGroup.patchValue(addresses[0]);
          }
          this.contactFormGroup1.forEach((contactFormGroup, index) => {
            if (!contacts?.length) {
              return;
            }
            contactFormGroup.patchValue(contacts[index]);
          });
          // this.contactFormGroup.patchValue(person?.contacts);
          // this.formAcl.patchValue(acl);
        });
      }
    });
  }

  // formArrayPatchValues(formArray: FormArray, data: any) {
  //   if (!data.length) {
  //     return;
  //   }
  //   contactFormGroup;

  // }

  ngOnInit(): void {
    this.personFormGroup = this._formBuilder.group({
      name: new FormControl('', [ValidateRequired]),
      cpf: new FormControl('', [ValidateRequired, ValidateCpf]),
      gender: new FormControl('', [ValidateRequired]),
      birthday: new FormControl('', [ValidateRequired]),
      email: new FormControl('', [ValidateRequired, ValidateEmail]),
      password: new FormControl('', [ValidateRequired]),
      confirmPassword: new FormControl('', [ValidateRequired]),
      avatar: new FormControl('', [ValidateRequired]),
    });
    this.addressFormGroup = this._formBuilder.group({
      zipcode: new FormControl('', [ValidateRequired]),
      number: new FormControl('', [ValidateRequired]),
      street: new FormControl({ value: null, disabled: true }, [
        ValidateRequired,
      ]),
      neighborhood: new FormControl({ value: null, disabled: true }, [
        ValidateRequired,
      ]),
      city: new FormControl({ value: null, disabled: true }, [
        ValidateRequired,
      ]),
      state: new FormControl({ value: null, disabled: true }, [
        ValidateRequired,
      ]),
      country: new FormControl({ value: 'Brasil', disabled: true }, [
        ValidateRequired,
      ]),
    });

    this.contactFormGroup = new FormArray([
      new FormGroup({
        contactType: new FormControl('', [ValidateRequired]),
        value: new FormControl('', [ValidateRequired]),
        complement: new FormControl('', []),
      }),
    ]);
    console.log(this.contactFormGroup);

    const password = this.personFormGroup.get('password');
    this.personFormGroup
      .get('confirmPassword')
      ?.setValidators(ValidateMatchPassword(password));

    this.addressFormGroup
      .get('zipcode')
      ?.valueChanges.pipe(debounceTime(1000))
      .subscribe(this.getApiAddress.bind(this));
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get contactFormGroup1() {
    return this.contactFormGroup.controls as FormGroup[];
  }

  getApiAddress(zipcode: string): void {
    if (!zipcode || zipcode.length < 9 || !this.toCallCepApi) {
      this.toCallCepApi = true;
      return;
    }
    void this._zipcodeService.getCep(zipcode).then((zipcode: ZipcodeAPI) => {
      const { bairro, complemento, localidade, logradouro, uf } = zipcode;
      const zipcodeTransform: Zipcode = {
        city: localidade,
        state: uf,
        neighborhood: bairro,
        complement: complemento,
        street: logradouro,
      };

      this.addressFormGroup.patchValue(zipcodeTransform);
    });
  }

  addNewContact(): void {
    const concact = new FormGroup({
      contactType: new FormControl('', [ValidateRequired]),
      value: new FormControl('', [ValidateRequired]),
      complement: new FormControl('', []),
    });

    this.contactFormGroup.push(concact);
  }

  removeContact(index: number): void {
    if (!index) {
      return;
    }
    this.contactFormGroup.removeAt(index);
  }

  onSaveUser(): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const person = {
      ...this.personFormGroup.value,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      addresses: [this.addressFormGroup.getRawValue()],
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      contacts: this.contactFormGroup.value,
    };
    console.log(person);
  }
}
