import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ValidateMatchPassword, ValidateRequired } from 'anutils/validators';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  form: FormGroup;
  constructor(private _authService: AuthService) {
    this.form = new FormGroup({
      currentPassword: new FormControl(null, [ValidateRequired]),
      newPassword: new FormControl(null, [ValidateRequired]),
      confirmNewPassword: new FormControl(null, [ValidateRequired]),
    });
    const password = this.form.get('newPassword');
    this.form
      .get('confirmNewPassword')
      ?.setValidators(ValidateMatchPassword(password));
  }

  handleChangePassword(): void {
    console.log(this.form.getRawValue());
  }
}
