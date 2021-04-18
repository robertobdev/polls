import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidateEmail, ValidateRequired } from 'anutils/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  public loginInvalid = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: new FormControl(null, [ValidateEmail, ValidateRequired]),
      password: new FormControl(null, [
        ValidateRequired,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {}
}
