import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent, HeaderComponent } from './components';

import { OneColumnLayout } from './layouts';
import { SharedModule } from '../shared/shared.module';

const COMPONENTS = [FooterComponent, HeaderComponent, OneColumnLayout];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [CommonModule, ...COMPONENTS],
  imports: [CommonModule, SharedModule],
})
export class ThemeModule {}
