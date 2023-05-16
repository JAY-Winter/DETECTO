import SignIn from '@/pages/SignIn';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { useRecoilState } from 'recoil';
import authState from '@/store/authState';
import useAxios from '@/hooks/useAxios';
import { UserInfo } from '@/store/userInfoStroe';
import { UserType } from 'UserTypes';
import usePush from '@/hooks/usePush';
import LoadingWithLogo from '@/components/common/LoadingWithLogo';
import { RequestObj } from 'AxiosRequest';

type AuthProviderProps = {
  children: React.ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(authState);
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);
  const getSubscription = usePush();

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
        console.log(`[DEBUG - authProvider] ${response.data.data}`);
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

  const [pushData, isPushLoading, setPushRequestObj] = useAxios({
    baseURL: 'https://detecto.kr/api/',
  });

  const [authData, isAuthLoading, setAuthRequestObj] = useAxios({
    tryHandler: tryHandler,
    catchHandler: catchHandler,
    baseURL: 'https://detecto.kr/api/',
  });

  const sendSubscription = async () => {
    if (!userInfo.id) {
      return;
    }
    try {
      const [endpoint, p256dh, auth] = await getSubscription();
      if (endpoint && p256dh && auth) {
        // 서버에게 구독 객체 전송
        console.log("------------전송할 구독 객체 정보------------");
        console.log("id:", userInfo.id);
        console.log("endpoint:", endpoint);
        console.log("p256dh:", p256dh);
        console.log("auth:", auth);
        console.log("----------------------------------------");
      }
      const requestObj: RequestObj = {
        url: '/user/token',
        method: 'post',
        body: {
          id: userInfo.id,
          endpoint: endpoint,
          p256dh: p256dh,
          auth: auth
        }
      }
      setPushRequestObj(requestObj);
    } catch(error) {
      console.error(error);
    }
  }

  // 로그인 상태가 변경되면 액션을 달리 취함
  useEffect(() => {
    if (isAuthenticated === undefined) {
      // useAxios Hook의 요청객체 세팅 --> useAxios Hook은 곧바로 요청 시작함
      setAuthRequestObj({
        url: 'user/auth',
        method: 'post',
      });
    } else if (isAuthenticated === true) {
      sendSubscription();
      navigate(location.pathname);
    } else {
      sendSubscription();
      navigate('/', { replace: true });
    }
  }, [isAuthenticated]);

  if (isAuthenticated === true) {
    return <>{children}</>;
  } else if (isAuthenticated === false) {
    return <SignIn />;
  } else {
    return (
      <LoadingWithLogo />
    );
  }
}

export default AuthProvider;
