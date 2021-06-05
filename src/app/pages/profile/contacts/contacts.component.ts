import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ValidateRequired } from 'anutils/validators';
import { Contact } from '../interfaces/contact.interface';
import { CONTACTYPE } from '../interfaces/contact_type.enum';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  contactFormArray: FormArray;
  contactTypes = Object.values(CONTACTYPE);

  constructor() {
    this.contactFormArray = new FormArray([
      new FormGroup({
        identify: new FormControl(null, [ValidateRequired]),
        contactType: new FormControl(null, [ValidateRequired]),
        value: new FormControl(null, [ValidateRequired]),
        complement: new FormControl(null, []),
      }),
    ]);
  }

  get contactFormGroups(): FormGroup[] {
    return this.contactFormArray.controls as FormGroup[];
  }

  addNewContact(contact: Contact | null = null): void {
    const concact = new FormGroup({
      identify: new FormControl(contact?.identify, [ValidateRequired]),
      contactType: new FormControl(contact?.contactType, [ValidateRequired]),
      value: new FormControl(contact?.value, [ValidateRequired]),
      complement: new FormControl(contact?.complement, []),
    });

    this.contactFormArray.push(concact);
  }

  removeContact(index: number): void {
    if (!index) {
      return;
    }
    this.contactFormArray.removeAt(index);
  }

  saveContacts(): void {
    console.log(this.contactFormArray.getRawValue());
  }
}
