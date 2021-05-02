import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
  id!: number;

  constructor(
    private _formBuilder: FormBuilder,
    private _aclService: AclService,
    private _router: Router,
    private _activateRouter: ActivatedRoute
  ) {
    this.formAcl = this._formBuilder.group({
      roleId: new FormControl(null, [ValidateRequired]),
      moduleId: new FormControl(null, [ValidateRequired]),
      isShow: new FormControl(true, []),
      isGet: new FormControl(true, []),
      isPost: new FormControl(true, []),
      isUpdate: new FormControl(true, []),
      isDelete: new FormControl(true, []),
    });
    this._activateRouter.paramMap.subscribe((params: ParamMap) => {
      this.id = parseInt(params.get('id') as string);
      if (this.id) {
        void this._aclService.getAcl(this.id).then((acl) => {
          if (!acl) {
            void this._router.navigateByUrl('/acl');
            return;
          }
          this.formAcl.patchValue(acl);
        });
      }
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
    void this._aclService
      .saveAcl({
        ...form,
        roleId: +form.roleId,
        moduleId: +form.moduleId,
      })
      .then(() => this._router.navigateByUrl('/acl/list'));
  }
}
