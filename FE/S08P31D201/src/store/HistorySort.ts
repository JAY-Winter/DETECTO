import { atom } from 'recoil';

export type THistorySortField = 'Date' | 'Team' | 'Equipment' | '';

export type THistorySortOrder = 'asc' | 'desc';

const HistorySortField = atom<THistorySortField>({
  key: 'HistorySortField',
  default: 'Date',
});

const HistorySortOrder = atom<THistorySortOrder>({
  key: 'HistorySortOrder',
  default: 'desc',
});

export { HistorySortField, HistorySortOrder };
