import { atom } from 'recoil';

export type TDashboardSortField = 'Date' | 'Team' | 'Equipment' | '';

export type TDashboardSortOrder = 'asc' | 'desc';

const DashboardSortField = atom<TDashboardSortField>({
  key: 'dashboardSortField',
  default: '',
});

const DashboardSortOrder = atom<TDashboardSortOrder>({
  key: 'dashboardSortOrder',
  default: 'asc',
});

export { DashboardSortField, DashboardSortOrder };
