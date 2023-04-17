import dayjs, { Dayjs } from 'dayjs';
import { atom } from 'recoil';

type TdashboardDay = {
  startDay: Dayjs;
  endDay: Dayjs;
};

const DashboardDayAtom = atom<TdashboardDay>({
  key: 'dashboardDay',
  default: { startDay: dayjs(), endDay: dayjs() },
});

const DashboardEqAtom = atom<string[]>({
  key: 'dashboardEq',
  default: []
})

export { DashboardDayAtom, DashboardEqAtom };
