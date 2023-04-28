import authState from "@/store/authState"
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import useAxios from "./useAxios";

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(authState);
  const axios = useAxios();
  
  // 현재 보유한 쿠키가 적합한지 판단 요청 보내는 함수
  const checkCookieAvailable = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: 'auth'
      })
      if (response.status === 200) {
        setIsAuthenticated(true);
      }
    } catch(e) {
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