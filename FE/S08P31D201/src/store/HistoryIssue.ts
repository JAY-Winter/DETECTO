import { atom } from 'recoil';
import { ReportType } from 'ReportTypes';

const HistoryIssue = atom<ReportType[]>({
  key: 'HistoryIssue',
  default: [],
});

export { HistoryIssue };
