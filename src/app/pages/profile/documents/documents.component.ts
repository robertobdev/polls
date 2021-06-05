import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ValidateRequired } from 'anutils/validators';
import { Document } from '../interfaces/document.interface';
import { DOCUMENTTYPE } from '../interfaces/document_type.enum';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent {
  documentsFormArray: FormArray;
  documentTypes = Object.values(DOCUMENTTYPE);
  constructor() {
    this.documentsFormArray = new FormArray([
      new FormGroup({
        type: new FormControl(null, [ValidateRequired]),
        value: new FormControl(null, [ValidateRequired]),
        complement: new FormControl(null, []),
      }),
    ]);
  }

  get documentFormGroups(): FormGroup[] {
    return this.documentsFormArray.controls as FormGroup[];
  }

  addNewDocumentg(document: Document | null = null): void {
    const concact = new FormGroup({
      type: new FormControl(document?.type, [ValidateRequired]),
      value: new FormControl(document?.value, [ValidateRequired]),
      complement: new FormControl(document?.complement, []),
    });

    this.documentsFormArray.push(concact);
  }

  removeDocument(index: number): void {
    if (!index) {
      return;
    }
    this.documentsFormArray.removeAt(index);
  }

  saveDocuments(): void {
    console.log(this.documentsFormArray.getRawValue());
  }
}
