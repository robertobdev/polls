import { Component, Input, OnDestroy } from '@angular/core';
import { ModuleItem } from 'src/app/shared/interfaces/menu.interface';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { User } from '../../../pages/users/interfaces/user.interface';

@Component({
  selector: 'app-one-column',
  templateUrl: './one-column.layout.html',
  styleUrls: ['./one-column.layout.scss'],
})
export class OneColumnLayoutComponent implements OnDestroy {
  @Input() menus: ModuleItem[] | undefined;
  user: User | null;
  mobileQuery: MediaQueryList;

  mobileQueryChangeEvent: any;

  constructor(mediaMatcher: MediaMatcher, public authService: AuthService) {
    this.user = this.authService.user.value;
    this.menus = this.user?.modules;
    this.mobileQuery = mediaMatcher.matchMedia('(max-width: 500px)');

    this.mobileQueryChangeEvent = this.mobileQuery.addEventListener(
      'change',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {}
    );
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryChangeEvent);
  }
}
