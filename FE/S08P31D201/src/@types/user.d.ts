// User 타입 선언
declare module 'UserTypes' {
  export type UserType = {
    id?: number;
    name?: string;
    division?: string;
    img?: string;
    type?: 'WORKER' | 'ADMIN';
    theme?: 'light' | 'dark';
  };
}
