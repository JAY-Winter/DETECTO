// 이의제기 타입 선언
declare module 'IssueTypes' {
  export type IssueType = {
    id: number;
    reportId: number;
    createdAt: string;
    time: string;
    name: string;
    status: 'REJECTED' | 'NOT_APPLIED' | 'PENDING' | 'APPLIED';
    adminComment?: string;
    comment: string;
    team: TeamType;
  };

  type TeamType = {
    id: number;
    teamName: string;
    users: ReportUserType[];
  };
}
