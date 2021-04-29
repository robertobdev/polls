import { Default } from './default.interface';
import { ModuleItem } from './menu.interface';
import { Role } from './role.interface';

export interface Acl extends Default {
  description: string;
  roles: Role[];
  module: ModuleItem[];
}

export interface AclResponse {
  roles: Role[];
  modules: ModuleItem[];
}

export interface AclSaveBody {
  moduleId: number;
  roleId: number;
  isShow: boolean;
  isGet: boolean;
  isUpdate: boolean;
  isDelete: boolean;
}
