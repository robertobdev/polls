import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ValidateCpf, ValidateRequired } from 'anutils/validators';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  form: FormGroup;
  constructor(private _authService: AuthService) {
    const user = _authService.user.value;

    this.form = new FormGroup({
      cpf: new FormControl({ value: user?.cpf, disabled: true }, [
        ValidateRequired,
        ValidateCpf,
      ]),
      name: new FormControl({ value: user?.name, disabled: true }, [
        ValidateRequired,
      ]),
      gender: new FormControl({ value: user?.gender, disabled: true }, [
        ValidateRequired,
      ]),
      birthday: new FormControl(
        { value: new Date(user?.birthday || ''), disabled: true },
        [ValidateRequired]
      ),
    });
  }

  saveUser(): void {
    console.log(this.form.getRawValue());
  }
}
