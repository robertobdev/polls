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
      title: 'Usuários',
      icon: 'layout-outline',
      children: [
        {
          title: 'Criar',
          link: '/users/register',
        },
        {
          title: 'Listas',
          link: '/users/list',
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
