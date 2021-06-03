export interface ModuleItem {
  id?: number;
  title: string;
  router?: string;
  created_at?: string;
  updated_at?: string;
  submenus: Submenus;
}
export interface Submenus {
  menus: Submenu[];
}
export interface Submenu {
  title: string;
  router: string;
}
