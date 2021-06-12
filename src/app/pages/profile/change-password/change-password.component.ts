import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ValidateMatchPassword, ValidateRequired } from 'anutils/validators';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { User } from '../../users/interfaces/user.interface';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  form: FormGroup;
  user: User;
  constructor(
    private _profileService: ProfileService,
    private _authService: AuthService
  ) {
    this.user = this._authService.user.value as User;
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
    void this._profileService.changePassword(this.user.id, this.form.value);
  }
}
