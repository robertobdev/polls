import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../../interfaces/user.interface';
import { Login, LoginResponse } from '../../interfaces/login.interface';
import { JwtServiceUtil } from '../jwt.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASEURL = environment.baseUrl;
  user = new BehaviorSubject<User | null>(null);

  constructor(
    public http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.recoveryDataFromLocalStorage();
  }

  private recoveryDataFromLocalStorage(): void {
    const data: string | null = sessionStorage.getItem('user_data');
    if (!data) {
      return;
    }
    this.user.next(JSON.parse(data));
  }

  private setUserAndTokenLocalStorage(access_token: string): void {
    sessionStorage.setItem('access_token', access_token);
    const decodedJwt = JwtServiceUtil.getDecodedAccessToken(access_token);

    if (!decodedJwt || !decodedJwt.user) {
      return;
    }

    this.user.next(decodedJwt.user);

    sessionStorage.setItem('user_data', JSON.stringify(decodedJwt.user));
  }

  login(login: Login): Promise<LoginResponse> {
    const access_token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlciI6eyJuYW1lIjoiRnVsYW5vIiwiZW1haWwiOiJwcGF0cmljaWFzYXJhaG1lbG9AZ3J1cG9zZXRlZXN0cmVsYXMuY29tLmJyIiwiYXZhdGFyIjoiaHR0cHM6Ly9lbmNyeXB0ZWQtdGJuMC5nc3RhdGljLmNvbS9pbWFnZXM_cT10Ym46QU5kOUdjUnVJN0tFdmswX1MwUHdrMEdJdVVwd1hDVHhOdnZvT3FENFBBJnVzcXA9Q0FVIiwiY3BmIjoiMzUxLjkyMS44NjAtNzIiLCJiaXJ0aGRheSI6IjEwLzA4LzE5ODkiLCJnZW5kZXIiOiJGZW1pbmlubyIsIm1lbnVzIjpbeyJ0aXRsZSI6IlVzdcOhcmlvcyIsImljb24iOiJsYXlvdXQtb3V0bGluZSIsInByZWZpeFVybCI6InVzZXJzIiwiY2hpbGRyZW4iOlt7InRpdGxlIjoiQ3JpYXIiLCJsaW5rIjoiL3VzZXJzL3JlZ2lzdGVyIn0seyJ0aXRsZSI6Ikxpc3RhcyIsImxpbmsiOiIvdXNlcnMvbGlzdCJ9XX1dfSwiaWF0IjoxNTE2MjM5MDIyfQ.PkO1qmNpmd6au0qt_T_xZD4-x1N5jh-S2mUJBNyL4xg';

    return of({ access_token })
      .pipe(
        tap(({ access_token }: LoginResponse) => {
          this.setUserAndTokenLocalStorage(access_token);
          void this.router.navigate(['/']);
        })
      )
      .toPromise();
  }

  logout(): void {
    this.user.next(null);
    sessionStorage.clear();
    void this.router.navigate(['/auth/login']);
  }
}
