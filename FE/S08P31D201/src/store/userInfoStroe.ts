import { UserType } from "UserTypes";
import { atom } from "recoil";

const UserInfo = atom<UserType>({
  key: "userInfo",
  default: {
    id: undefined,
    name: undefined,
    division: undefined,
    img: undefined,
    type: undefined,
    theme: 'light'
  }
})

export { UserInfo };