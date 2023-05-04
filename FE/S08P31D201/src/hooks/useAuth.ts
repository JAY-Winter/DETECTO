// /* 클라이언트가 가진 쿠키가 valid한지 판단한다 */

// import authState from "@/store/authState"
// import { useEffect } from "react";
// import { useRecoilState, useSetRecoilState } from "recoil";
// import useAxios from "./useAxios";
// import { UserInfo } from "@/store/userInfoStroe";
// import { AxiosError, AxiosResponse } from 'axios';

// function useAuth() {
//   const [isAuthenticated, setIsAuthenticated] = useRecoilState(authState);
//   const setUserInfo = useSetRecoilState(UserInfo);
  
//   const tryHandler = (response: AxiosResponse) => {
//     const data = response.data;
//     const status = response.status;
//     console.log("useAuth 데이터:", data);
//     console.log("useAuth 상태코드:", status);
//     if (status === 200) {
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//   }

//   const catchHandler = (error: AxiosError) => {
//     setIsAuthenticated(false);
//     switch (error.status) {
//       case 400:
//         alert('아이디와 비밀번호를 확인해주세요');
//         break;
//       case 401:
//         alert('인증되지 않은 요청입니다');
//         break;
//       case 404:
//         alert('리소스를 찾을 수 없습니다');
//         break;
//       case 500:
//         alert('서버에서 오류가 발생했습니다');
//         break
//       default:
//         alert('알 수 없는 에러...')
//     }
//   }
  
//   const [data, isLoading, setRequestObj] = useAxios({tryHandler: tryHandler, catchHandler: catchHandler});
  
//   // 요청 함수
//   const checkCookieAvailable = () => {
//     setRequestObj({
//       url: 'user/auth',
//       method: 'post'
//     })
//   }
  
//   // useEffect(() => {
//   //   if (isAuthenticated === undefined) {
//   //     checkCookieAvailable();
//   //   }
//   // }, [isAuthenticated])

//   return isAuthenticated;
// }

// export default useAuth;