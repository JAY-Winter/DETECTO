import SignIn from '@/pages/SignIn';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';
import authState from '@/store/authState';
import useAxios from '@/hooks/useAxios';
import { UserInfo } from '@/store/userInfoStroe';
import { UserType } from 'UserTypes';

type AuthProviderProps = {
  children: React.ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(authState);
  const setUserInfo = useSetRecoilState(UserInfo);

  // 쿠키값 유효할 경우 핸들러
  const tryHandler = (response: AxiosResponse) => {
    if (response.status === 200) {
      if (response.data && 'data' in response.data && response.data.data) {
        const responseUserInfo = response.data.data as UserType;
        const newUser: UserType = {
          id: responseUserInfo.id,
          name: responseUserInfo.name,
          division: responseUserInfo.division,
          img: responseUserInfo.img,
          type: responseUserInfo.type,
          theme: responseUserInfo.theme,
        };
        console.log(`[DEBUG] ${newUser}`);
        setUserInfo(newUser);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }
  };

  // 쿠키값 유효하지 않을경우 핸들러
  const catchHandler = (errorCode: number) => {
    setIsAuthenticated(false);
  };

  const [data, isLoading, setRequestObj] = useAxios({
    tryHandler: tryHandler,
    catchHandler: catchHandler,
    baseURL: 'https://k8d201.p.ssafy.io/api/',
  });

  // 로그인 상태가 변경되면 액션을 달리 취함
  useEffect(() => {
    if (isAuthenticated === undefined) {
      // useAxios Hook의 요청객체 세팅 --> useAxios Hook은 곧바로 요청 시작함
      setRequestObj({
        url: 'user/auth',
        method: 'post',
      });
    } else if (isAuthenticated === true) {
      navigate(location.pathname);
    } else {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated]);

  if (isAuthenticated === true) {
    return <>{children}</>;
  } else if (isAuthenticated === false) {
    return <SignIn />;
  } else {
    return <div>로딩중...</div>;
  }
}

export default AuthProvider;
