export interface IBreadcrumbItem {
  title: string;
  href?: string;
}

export interface BreadcrumbsProps {
  title?: string;
  items?: IBreadcrumbItem[];
}
