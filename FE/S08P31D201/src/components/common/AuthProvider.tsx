import SignIn from '@/pages/SignIn';
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';
import { useRecoilState } from 'recoil';
import authState from '@/store/authState';
import useAxios from '@/hooks/useAxios';

type AuthProviderProps = {
  children: React.ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(authState);

  // 쿠키값 유효할 경우 핸들러
  const tryHandler = (response: AxiosResponse) => {
    if (response.status == 200) {
      setIsAuthenticated(true)
    }
  }

  // 쿠키값 유효하지 않을경우 핸들러
  const catchHandler = (errorCode: number) => {
    setIsAuthenticated(true);
  }

  const [data, isLoading, setRequestObj] = useAxios({tryHandler: tryHandler, catchHandler: catchHandler, baseURL: "https://k8d201.p.ssafy.io/api/"});

  // 로그인 상태가 변경되면 액션을 달리 취함
  useEffect(() => {
    if (isAuthenticated === undefined) {
      // useAxios Hook의 요청객체 세팅 --> useAxios Hook은 곧바로 요청 시작함
      setRequestObj({
        url: 'user/auth',
        method: 'post'
      })
    } else if (isAuthenticated === true) {
      console.log(`인증 성공! ${location.pathname}로 이동할 것임`);
      navigate(location.pathname);
    } else {
      console.log("인증 실패...");
      navigate('/', { replace: true });
    }
  }, [isAuthenticated])

  if (isAuthenticated === true) {
    return (
      <>
        {children}
      </>
    )
  } else if (isAuthenticated === false) {
    return (
      <SignIn />
    )
  } else {
    return (
      <div>로딩중...</div>
    )
  }
}

export default AuthProvider