import { ViewModule, Edit } from '@mui/icons-material';
import { SvgIconComponent } from '@mui/icons-material';

export interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon: SvgIconComponent;
}

export const menuItems: MenuItem[] = [
  {
    id: 'beehive',
    label: 'BeeHive',
    path: '/beehive',
    icon: ViewModule,
  },
  {
    id: 'editor',
    label: 'Editor',
    path: '/editor',
    icon: Edit,
  },
];
