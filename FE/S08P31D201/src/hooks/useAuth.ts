import authState from "@/store/authState"
import { useEffect } from "react";
import { useRecoilState } from "recoil";

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(authState);
  
  // 현재 보유한 쿠키가 적합한지 판단 요청 보내는 함수
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