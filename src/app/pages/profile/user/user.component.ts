/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Component, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private _authService: AuthService) {
    const user = this._authService.user.value;

    this.form = new FormGroup({
      cpf: new FormControl({ value: user?.cpf, disabled: true }, [
        ValidateRequired,
        ValidateCpf,
      ]),
      name: new FormControl(user?.name, [ValidateRequired]),
      gender: new FormControl(user?.gender, [ValidateRequired]),
      birthday: new FormControl({ value: user?.birthday, disabled: true }, [
        ValidateRequired,
      ]),
      avatar: new FormControl(user?.avatar, [ValidateRequired]),
    });
  }

  saveUser(): void {
    console.log(this.form.getRawValue());
  }
  openFile(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.fileInput?.nativeElement?.click();
  }

  uploadFileEvt(imgFile: EventTarget | null): void {
    const img = imgFile as HTMLInputElement;
    if (!img?.files) {
      return;
    }

    // HTML5 FileReader API
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.form.get('avatar')?.setValue(e.target?.result);
    };
    reader.readAsDataURL(img.files[0]);
  }
}
