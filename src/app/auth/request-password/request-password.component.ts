import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidateEmail, ValidateRequired } from 'anutils/validators';

@Component({
  selector: 'app-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss'],
})
export class RequestPasswordComponent {
  form: FormGroup;
  public loginInvalid = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: new FormControl(null, [ValidateEmail, ValidateRequired]),
    });
  }

  onSubmit() {}
}
