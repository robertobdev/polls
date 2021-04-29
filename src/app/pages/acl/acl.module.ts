import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AclRoutingModule } from './acl-routing.module';
import { AclComponent } from './acl.component';
import { ListAclComponent } from './list-acl/list-acl.component';
import { RegisterAclComponent } from './register-acl/register-acl.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AclComponent, RegisterAclComponent, ListAclComponent],
  imports: [CommonModule, AclRoutingModule, SharedModule],
})
export class AclModule {}
