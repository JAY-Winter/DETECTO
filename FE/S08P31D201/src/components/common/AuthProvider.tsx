import SignIn from '@/pages/SignIn';
import authState from '@/store/authState';
import useAuth from '@/hooks/useAuth';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

type AuthProviderProps = {
  children: React.ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();

  useEffect(() => {
    if (isAuthenticated === undefined) {
      console.log("로그인 상태 모름");
    } else if (isAuthenticated) {
      console.log("로그인 성공. dashboard로 이동할 것임");
      navigate('/');
    } else if (isAuthenticated === false) {
      console.log("로그인 실패. login으로 이동할 것임");
      navigate('/', { replace: true });
    }
  }, [isAuthenticated])

  if (isAuthenticated === undefined) {
    return (
      <div>로딩중...</div>
    )
  } else if (isAuthenticated === false) {
    return (
      <SignIn />
    )
  }else {
    return (
      <>
        {children}
      </>
    )
  }
}

export default AuthProvider