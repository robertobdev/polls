import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SharedModule } from '../shared/shared.module';
import { AwesomeTimeModule } from 'anutils-lib-test/awesome-time';
import { AnutilsLibModule } from 'anutils-lib-test';

@NgModule({
  declarations: [
    LoginComponent,
    RequestPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    AwesomeTimeModule,
    AnutilsLibModule,
  ],
})
export class AuthModule {}
