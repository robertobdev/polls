import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidateEmail, ValidateRequired } from 'anutils/validators';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss'],
})
export class RequestPasswordComponent implements OnInit {
  form!: FormGroup;

  constructor(private _authService: AuthService, private _router: Router) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [ValidateEmail, ValidateRequired]),
    });
  }

  onRequestPassword(): void {
    void this._authService.requestPassword(this.form.value).then(() => {
      void this._router.navigateByUrl('/');
    });
  }
}
