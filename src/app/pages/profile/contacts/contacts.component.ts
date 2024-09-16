import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ValidateRequired } from 'anutils/validators';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Contact } from '../../users/interfaces/contact.interface';
import { CONTACTYPE } from '../../users/interfaces/contact_type.enum';
import { User } from '../../users/interfaces/user.interface';
import { USER_GRAPHQL_TYPES } from '../../users/interfaces/users-graphql-type.enum';
import { UsersService } from '../../users/services/users.service';
import { ProfileService } from '../services/profile.service';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  contactFormArray: FormArray;
  contactTypes = Object.values(CONTACTYPE);
  user: User;

  constructor(
    private _userService: UsersService,
    private _profileService: ProfileService,
    private _authService: AuthService
  ) {
    this.user = this._authService.user.value as User;
    this.contactFormArray = new FormArray([]);
    void this._userService
      .getUser(this.user.id, USER_GRAPHQL_TYPES.CONTACTS)
      .subscribe(({ data }) => {
        const user = data.user;
        console.log(user.addresses);
        //TODO: IF not existe add one
        for (const contact of user.contacts || []) {
          this.addNewContact(contact);
        }
      });
  }

  get contactFormGroups(): FormGroup[] {
    return this.contactFormArray.controls as FormGroup[];
  }

  addNewContact(contact: Contact | null = null): void {
    const contactForm = new FormGroup({
      id: new FormControl(contact?.id, []),
      contactType: new FormControl(contact?.contactType, [ValidateRequired]),
      value: new FormControl(contact?.value, [ValidateRequired]),
      complement: new FormControl(contact?.complement, []),
    });

    this.contactFormArray.push(contactForm);
  }

  removeContact(index: number): void {
    const contactId = this.contactFormGroups[index].get('id')?.value as number;
    if (!index || this.contactFormArray.invalid) {
      this.contactFormArray.removeAt(index);
      return;
    }
    void this._profileService.deleteContact(contactId).then(() => {
      this.contactFormArray.removeAt(index);
    });
  }

  saveContacts(): void {
    const contacts = this.contactFormArray.getRawValue();
    //TODO: When I call this function it should return new ids so I can delete them
    void this._profileService
      .updateContacts(this.user.id, contacts)
      .then(({ data }) => {
        const resultContats = data as Contact[];
        for (const [index, contact] of resultContats.entries()) {
          console.log(index, contact);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          this.contactFormGroups[index].patchValue(contact);
        }
      });
  }
}
