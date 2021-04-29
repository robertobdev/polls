import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAclComponent } from './list-acl/list-acl.component';
import { RegisterAclComponent } from './register-acl/register-acl.component';
import { AclComponent } from './acl.component';

const routes: Routes = [
  {
    path: '',
    component: AclComponent,
    children: [
      {
        path: 'register',
        component: RegisterAclComponent,
      },
      {
        path: 'register/:id',
        component: RegisterAclComponent,
      },
      {
        path: 'list',
        component: ListAclComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AclRoutingModule {}
