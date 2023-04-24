import authState from "@/store/authState"
import { useRecoilValue } from "recoil";

const useAuth = () => {
  const isAuthenticated = useRecoilValue(authState);
  return isAuthenticated;
}

export default useAuth;