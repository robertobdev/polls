import { Component, Input, OnDestroy } from '@angular/core';
import { MenuItem } from 'src/app/shared/interfaces/menu.interface';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-one-column',
  templateUrl: './one-column.layout.html',
  styleUrls: ['./one-column.layout.scss'],
})
export class OneColumnLayoutComponent implements OnDestroy {
  @Input() menus: MenuItem[] = [
    {
      title: 'Directives',
      icon: 'layout-outline',
      children: [
        {
          title: 'Cpf Mask',
          link: '/directives/cpfmask',
        },
        {
          title: 'Cnpj Mask',
          link: '/directives/cnpjmask',
        },
        {
          title: 'Phone Mask',
          link: '/directives/phonemask',
        },
        {
          title: 'Shimmer',
          link: '/directives/shimmer',
        },
        {
          title: 'Zipcode Mask',
          link: '/directives/zipcodemask',
        },
      ],
    },
    {
      title: 'Validators',
      icon: 'layout-outline',
      children: [
        {
          title: 'Cpf',
          link: '/validators/cpf',
        },
        {
          title: 'Cnpj',
          link: '/validators/cnpj',
        },
        {
          title: 'Phone',
          link: '/validators/phone',
        },
        {
          title: 'Match Passwords',
          link: '/validators/matchpasswords',
        },
        {
          title: 'Email',
          link: '/validators/email',
        },
        {
          title: 'Required',
          link: '/validators/required',
        },
      ],
    },
  ];
  mobileQuery: MediaQueryList;

  mobileQueryChangeEvent: any;

  constructor(mediaMatcher: MediaMatcher) {
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
