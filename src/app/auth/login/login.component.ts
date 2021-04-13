import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      username: [null, Validators.email],
      password: [null, Validators.required],
    });
  }

  onSubmit() {}
}
