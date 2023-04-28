import dayjs, { Dayjs } from 'dayjs';
import { atom } from 'recoil';

type ThistoryDay = {
  [key: string]: Dayjs;
  startDay: Dayjs;
  endDay: Dayjs;
};

const HistoryDayAtom = atom<ThistoryDay>({
  key: 'historyDay',
  default: { startDay: dayjs(), endDay: dayjs() },
});

const HistoryEqAtom = atom<string[]>({
  key: 'historyEq',
  default: []
})

export { HistoryDayAtom, HistoryEqAtom };
