import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  styleUrls: ['./pages.component.scss'],
  template: `
    <app-one-column>
      <router-outlet></router-outlet>
    </app-one-column>
  `,
})
export class PagesComponent {}
