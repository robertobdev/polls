import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent, HeaderComponent } from './components';

import { OneColumnLayoutComponent } from './layouts';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

const COMPONENTS = [FooterComponent, HeaderComponent, OneColumnLayoutComponent];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [CommonModule, ...COMPONENTS],
  imports: [CommonModule, SharedModule, RouterModule],
})
export class ThemeModule {}
