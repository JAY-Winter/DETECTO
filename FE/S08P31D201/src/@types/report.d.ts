// import { Dayjs } from 'dayjs';

// 리포트 타입 선언
declare module 'ReportTypes' {
  export type ReportType = {
    id: number;
    reportItems: string[];
    team: TeamType;
    time: string;
    user: UserType;
    x: number;
    y: number;
  };
  export type NewReportType = {
    id: number;
    reportItems: string[];
    team: TeamType;
    time: Date;
    user: UserType;
    x: number;
    y: number;
  };
  export type TeamType = {
    id: number;
    teamName: string;
  };
  export type UserType = {
    id: number;
  };
  export type DateFilterType = {
    [key: string]: Dayjs;
    startDay: Dayjs;
    endDay: Dayjs;
  };
}
