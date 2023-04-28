import authState from "@/store/authState"
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(authState);
  
  // 서버와 비동기 통신하여 로그인 상태를 결정한다
  const checkCookieAvailable = async () => {
    const response = await fetch('/auth');
    if (response.status === 200) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }
  
  useEffect(() => {
    if (isAuthenticated === undefined) {
      checkCookieAvailable();
    }
  }, [isAuthenticated])

  return isAuthenticated;
}

export default useAuth;