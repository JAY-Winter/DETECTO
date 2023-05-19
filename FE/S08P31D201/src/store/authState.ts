import { atom } from "recoil";

const authState = atom<boolean | undefined>({
  key: 'AuthState',
  default: undefined  // 초기 로그인 상태는 undefined로 설정
});

export default authState;