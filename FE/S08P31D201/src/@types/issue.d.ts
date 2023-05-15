// 이의제기 타입 선언
declare module 'IssueTypes' {
  export type IssueType = {
    id: number;
    createdDate: string;
    reportItems: string[];
    team: TeamType;
    time: string;
    cctvArea: number;
    user: UserType;
    status: 'REJECTED' | 'NOT_APPLIED' | 'PENDING' | 'APPLIED';
    adminComment?: string;
    workerComment?: string;
  };
}
