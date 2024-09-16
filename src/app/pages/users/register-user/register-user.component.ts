import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  RequiredValidator,
} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  ValidateCpf,
  ValidateEmail,
  ValidateMatchPassword,
  ValidateRequired,
} from 'anutils/validators';
import { debounceTime } from 'rxjs/operators';
import { Role } from 'src/app/shared/interfaces/role.interface';
import {
  Zipcode,
  ZipcodeAPI,
} from 'src/app/shared/interfaces/zipcode.interface';
import { ZipcodeService } from 'src/app/shared/services/zipcode.service';
import { AclService } from '../../acl/services/acl.service';
import { Contact } from '../interfaces/contact.interface';
import { CONTACTYPE } from '../interfaces/contact_type.enum';
import { User } from '../interfaces/user.interface';
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
  contactFormArray!: FormArray;
  roleFormArray!: FormArray;
  maxDate: Date;
  contactTypes = Object.values(CONTACTYPE);
  id!: number;
  toCallCepApi = true;
  roles!: Role[];
  constructor(
    private _formBuilder: FormBuilder,
    private _zipcodeService: ZipcodeService,
    private _router: Router,
    private _activateRouter: ActivatedRoute,
    private _userService: UsersService,
    private _aclService: AclService
  ) {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear - 17, 11, 31);
    this._activateRouter.paramMap.subscribe((params: ParamMap) => {
      this.id = parseInt(params.get('id') as string);
      if (this.id) {
        // void this._userService.getUser(this.id, null).then((person: Person) => {
        //   const { addresses, contacts } = person;
        //   if (!person) {
        //     void this._router.navigateByUrl('/users');
        //     return;
        //   }
        //   this.personFormGroup.patchValue(person);
        //   this.personFormGroup.removeControl('password');
        //   this.personFormGroup.removeControl('confirmPassword');
        //   if (addresses?.length) {
        //     this.toCallCepApi = false;
        //     this.addressFormGroup.patchValue(addresses[0]);
        //   }
        //   this.contactFormArray.clear();
        //   person.contacts?.forEach((contact) => {
        //     this.addNewContact(contact);
        //   });
        //   this.roleFormArray.clear();
        //   person.user?.roles.forEach((role) => {
        //     this.addNewRole(role);
        //   });
        // });
      }
    });

    void this._aclService.getAclConfigurations().then(({ roles }) => {
      this.roles = roles;
    });
  }

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

    this.contactFormArray = new FormArray([
      new FormGroup({
        contactType: new FormControl('', [ValidateRequired]),
        value: new FormControl('', [ValidateRequired]),
        complement: new FormControl('', []),
      }),
    ]);

    this.roleFormArray = new FormArray([
      new FormControl('', [ValidateRequired]),
    ]);

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
  get contactFormGroups() {
    return this.contactFormArray.controls as FormGroup[];
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get roleFormControls() {
    return this.roleFormArray.controls as FormControl[];
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

  addNewContact(contact: Contact | null = null): void {
    const concact = new FormGroup({
      contactType: new FormControl(contact?.contactType, [ValidateRequired]),
      value: new FormControl(contact?.value, [ValidateRequired]),
      complement: new FormControl(contact?.complement, []),
    });

    this.contactFormArray.push(concact);
  }

  addNewRole(role: Role | null = null): void {
    this.roleFormArray.push(new FormControl(role?.id, [ValidateRequired]));
  }

  removeRole(index: number): void {
    if (!index) {
      return;
    }
    this.roleFormArray.removeAt(index);
  }

  removeContact(index: number): void {
    if (!index) {
      return;
    }
    this.contactFormArray.removeAt(index);
  }

  onSaveUser(): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const person: User = {
      ...this.personFormGroup.value,
      id: this.id,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      addresses: [this.addressFormGroup.getRawValue()],
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      contacts: this.contactFormArray.value,
      user: {
        personId: this.id,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        login: this.personFormGroup.get('email')?.value,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        roles: this.roleFormArray.value,
      },
    };
    if (!this.id) {
      void this._userService.updateUser(this.id, person);
      return;
    }
    void this._userService.saveUser(person);
  }
}
