import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { ModuleItem } from '../../interfaces/menu.interface';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  private COMMON_MODULE = ['/', '/profile'];

  constructor(private auth: AuthService, private router: Router) {}

  private hasPermission(menus: ModuleItem[], stateUrl: string): boolean {
    if (this.COMMON_MODULE.includes(stateUrl)) {
      return true;
    }

    const hasPermission = menus.find((menu) => {
      return stateUrl.includes(menu.router || '');
    });
    return !!hasPermission;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = this.auth.user.value;
    const hasPermission = user && this.hasPermission(user.modules, state.url);
    if (!hasPermission) {
      void this.router.navigate(['/auth/login']);
      return false;
    }

    return true;
  }
}
