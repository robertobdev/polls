import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  ValidateCpf,
  ValidateEmail,
  ValidateRequired,
} from 'anutils/validators';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  form: FormGroup;
  user: User | null;
  avatar = '';
  maxDate: Date;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.user = this.authService.user.value;
    this.avatar = this.user?.avatar || '';
    const birthday = new Date(this.user?.birthday as string);
    this.form = this.fb.group({
      name: new FormControl(this.user?.name, [ValidateRequired]),
      cpf: new FormControl(this.user?.cpf, [ValidateRequired, ValidateCpf]),
      gender: new FormControl(this.user?.gender, [ValidateRequired]),
      birthday: new FormControl(birthday, [ValidateRequired]),
      email: new FormControl(this.user?.email, [
        ValidateRequired,
        ValidateEmail,
      ]),
      password: new FormControl(null, []),
      confirmPassword: new FormControl(null, []),
      avatar: new FormControl(null, []),
    });

    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear - 17, 11, 31);
  }

  onFileChange(event: Event): void {
    const reader = new FileReader();
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length) {
      //TODO: Add new validations
      const file = target.files[0];
      reader.readAsDataURL(file);

      reader.onload = () => {
        const avatar = reader.result as string;
        this.avatar = avatar;
        this.form.get('avatar')?.setValue(avatar);
      };
    }
  }

  onSubmit(): void {
    console.log(this.form.value);
  }
}
