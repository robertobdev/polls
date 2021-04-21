import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidateEmail, ValidateRequired } from 'anutils/validators';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  public loginInvalid = false;

  constructor(private fb: FormBuilder, private userService: AuthService) {
    this.form = this.fb.group({
      email: new FormControl('admin@admin.com', [
        ValidateEmail,
        ValidateRequired,
      ]),
      password: new FormControl('123456', [
        ValidateRequired,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit(): void {
    void this.userService.login(this.form.value);
  }
}
