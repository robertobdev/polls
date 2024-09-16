import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  form!: FormGroup;
  public loginInvalid = false;

  constructor(private fb: FormBuilder, private userService: AuthService) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      login: new FormControl('admin@admin.com', [
        ValidateEmail,
        ValidateRequired,
      ]),
      password: new FormControl('123456', [
        ValidateRequired,
        Validators.minLength(6),
      ]),
    });
  }

  onLogin(): void {
    void this.userService.login(this.form.value);
  }
}
