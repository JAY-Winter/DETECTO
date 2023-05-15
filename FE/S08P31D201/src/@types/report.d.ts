// 리포트 타입 선언
declare module 'ReportTypes' {
  export type ReportType = {
    id: number;
    reportItems: string[];
    team: TeamType;
    time: string;
    cctvArea: number;
    user: ReportUserType;
    x: number;
    y: number;
    status: 'REJECTED' | 'NOT_APPLIED' | 'PENDING' | 'APPLIED';
  };
  export type NewReportType = {
    id: number;
    reportItems: string[];
    team: TeamType;
    time: Date;
    cctvArea: number;
    user: ReportUserType;
    x: number;
    y: number;
  };
  export type TeamType = {
    id: number;
    teamName: string;
    users: ReportUserType[];
  };
  export type ReportUserType = {
    id: number;
    image: string;
    name: string;
  };
  export type DateFilterType = {
    [key: string]: Dayjs;
    startDay: Dayjs;
    endDay: Dayjs;
  };
}
