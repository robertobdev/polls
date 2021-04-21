export interface MenuItem {
  title: string;
  link?: string;
  icon?: string;
  prefixUrl?: string;
  expanded?: boolean;
  children?: MenuItem[];
}
