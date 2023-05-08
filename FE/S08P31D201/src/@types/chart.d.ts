// 차트 타입 선언
declare module 'ChartTypes' {
  export type CountTimeData = {
    date: Date;
    value: string;
  };
  export type CountItemData = {
    reportItem: string;
    count: number;
  };
  export type CountTimeItemData = {
    reportItem: any;
    value: any;
  };
  export type CoordinationItemData = {
    reportItem: string;
    x: number;
    y: number;
  };
  export type CountTimeTeamData = {
    teamName: any;
    value: any;
  };
}
