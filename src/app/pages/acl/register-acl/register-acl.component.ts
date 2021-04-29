import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ValidateRequired } from 'anutils/validators';
import { AclSaveBody } from 'src/app/shared/interfaces/acl.interface';
import { ModuleItem } from 'src/app/shared/interfaces/menu.interface';
import { Role } from 'src/app/shared/interfaces/role.interface';
import { AclService } from '../services/acl.service';

@Component({
  selector: 'app-register-acl',
  templateUrl: './register-acl.component.html',
  styleUrls: ['./register-acl.component.scss'],
})
export class RegisterAclComponent implements OnInit {
  formAcl: FormGroup;
  roles!: Role[];
  modules!: ModuleItem[];

  constructor(
    private _formBuilder: FormBuilder,
    private _aclService: AclService
  ) {
    this.formAcl = this._formBuilder.group({
      roleId: new FormControl(1, [ValidateRequired]),
      moduleId: new FormControl(1, [ValidateRequired]),
      isShow: new FormControl(true, []),
      isGet: new FormControl(true, []),
      isPost: new FormControl(true, []),
      isUpdate: new FormControl(true, []),
      isDelete: new FormControl(true, []),
    });
  }

  ngOnInit(): void {
    void this._aclService.getAclConfigurations().then(({ roles, modules }) => {
      this.modules = modules;
      this.roles = roles;
    });
  }

  saveAcl(): void {
    const form = this.formAcl.value as AclSaveBody;
    void this._aclService.saveAcl({
      ...form,
      roleId: +form.roleId,
      moduleId: +form.moduleId,
    });
  }
}
