export interface MenuItem {
  title: string;
  link?: string;
  icon?: string;
  expanded?: boolean;
  children?: MenuItem[];
}
