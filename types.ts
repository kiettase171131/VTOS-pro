import { LucideIcon } from 'lucide-react';

export interface SubMenuItem {
  id: string;
  label: string;
  icon?: LucideIcon;
}

export interface MenuGroup {
  id: string;
  label: string;
  icon: LucideIcon;
  items: SubMenuItem[];
}

export type ViewState = 'DASHBOARD' | string; // Will expand as we add more screens