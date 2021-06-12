import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from './profile.component';
import { UserComponent } from './user/user.component';
import { AddressesComponent } from './addresses/addresses.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    ProfileComponent,
    UserComponent,
    AddressesComponent,
    ContactsComponent,
    ChangePasswordComponent,
  ],
  imports: [CommonModule, ProfileRoutingModule, SharedModule],
})
export class ProfileModule {}
