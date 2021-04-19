import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASEURL = environment.baseUrl;
  user = new BehaviorSubject<IUser | null>(null);

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

  logout(): void {
    this.user.next(null);
    sessionStorage.clear();
    void this.router.navigate(['/auth/login']);
  }
}
