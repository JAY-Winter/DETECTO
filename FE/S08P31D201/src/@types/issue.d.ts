// 이의제기 타입 선언
declare module 'IssueTypes' {
  export type IssueType = {
    id: number;
    createdAt: string;
    time: string;
    name: string;
    status: 'REJECTED' | 'NOT_APPLIED' | 'PENDING' | 'APPLIED';
    img: undefined;
    adminComment?: string;
    comment: string;
  };
}
