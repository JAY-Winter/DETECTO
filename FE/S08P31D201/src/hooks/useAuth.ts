/* 클라이언트가 가진 쿠키가 valid한지 판단한다 */

import authState from "@/store/authState"
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import useAxios from "./useAxios";
import { UserInfo } from "@/store/userInfoStroe";
import { AxiosError } from 'axios';

function useAuth() {
  const axios = useAxios();
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(authState);
  const setUserInfo = useSetRecoilState(UserInfo);
  
  // 요청 함수
  const checkCookieAvailable = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: '/user/auth',
        withCredentials: true
      })
      if (response.status === 200) {
        if (response.data) {
          setUserInfo(response.data);
        }
        setIsAuthenticated(true);
      }
    } catch(error) {  // 인증 실패
      setIsAuthenticated(false);
      // 에러 코드에 따라 다르게 처리할 수 있다
      // const axiosError = error as AxiosError;
      // switch (axiosError.response?.status) {
      //   case 400:
      //     alert('아이디와 비밀번호를 확인해주세요');
      //     break;
      //   case 401:
      //     alert('인증되지 않은 요청입니다');
      //     break;
      //   case 404:
      //     alert('리소스를 찾을 수 없습니다');
      //     break;
      //   case 500:
      //     alert('서버에서 오류가 발생했습니다');
      //     break
      //   default:
      //     alert('알 수 없는 에러...')
      // }
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