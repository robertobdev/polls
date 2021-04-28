export interface ModuleItem {
  id?: number;
  title: string;
  router?: string;
  icon?: string;
  prefixUrl?: string;
  expanded?: boolean;
  children?: ModuleItem[];
}
