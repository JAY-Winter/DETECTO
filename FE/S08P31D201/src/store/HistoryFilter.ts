import dayjs from 'dayjs';
import { atom } from 'recoil';
import { DateFilterType } from 'ReportTypes';

const HistoryDayAtom = atom<DateFilterType>({
  key: 'historyDay',
  default: { startDay: dayjs(), endDay: dayjs() },
});

const HistoryEqAtom = atom<string[]>({
  key: 'historyEq',
  default: []
})

export { HistoryDayAtom, HistoryEqAtom };
