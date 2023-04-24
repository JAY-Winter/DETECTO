import { atom } from "recoil";

const authState = atom({
  key: 'authState',
  default: false  // 초기 로그인 상태는 false로 설정
});

export default authState;