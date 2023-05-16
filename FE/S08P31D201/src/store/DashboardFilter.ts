import dayjs, { Dayjs } from 'dayjs';
import { atom } from 'recoil';
import { DateFilterType } from 'ReportTypes';

const DashboardDayAtom = atom<DateFilterType>({
  key: 'dashboardDay',
  default: { startDay: dayjs().startOf('year').add(1, 'day'), endDay: dayjs().endOf('year') },
});

export default DashboardDayAtom;
