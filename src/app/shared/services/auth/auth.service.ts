import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Login, LoginResponse } from '../../interfaces/login.interface';
import { User } from '../../../pages/users/interfaces/user.interface';

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
    const data: string | null = localStorage.getItem('user_data');
    if (!data) {
      return;
    }
    this.user.next(JSON.parse(data));
  }

  private setUserAndTokenLocalStorage(access_token: string): void {
    localStorage.setItem('access_token', access_token);
    void this.http
      .get<User>(`${this.BASEURL}/auth/user`)
      .toPromise()
      .then((user) => {
        this.user.next(user);
        localStorage.setItem('user_data', JSON.stringify(user));

        void this.router.navigate(['/']);
      });
  }

  login(login: Login): Promise<void | LoginResponse> {
    return this.http
      .post(`${this.BASEURL}/auth`, login)
      .toPromise()
      .then((res) => {
        const { access_token } = res as LoginResponse;
        this.setUserAndTokenLocalStorage(access_token);
      });
  }

  logout(): void {
    this.user.next(null);
    localStorage.clear();
    void this.router.navigate(['/auth/login']);
  }
}
