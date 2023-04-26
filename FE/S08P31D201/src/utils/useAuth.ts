import authState from "@/store/authState"
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(authState);
  // 서버와 비동기 통신하여 로그인 상태를 결정한다
  useEffect(() => {
    if (isAuthenticated === undefined) {
      setTimeout(() => {
        setIsAuthenticated(false);
      }, 3000);
    }
  }, [isAuthenticated])

  return isAuthenticated;
}

export default useAuth;