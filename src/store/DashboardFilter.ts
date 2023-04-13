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

export { DashboardDayAtom };
