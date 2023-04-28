import SignIn from '@/pages/SignIn';
import useAuth from '@/hooks/useAuth';
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

type AuthProviderProps = {
  children: React.ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useAuth();

  // 로그인 상태가 변경되면 액션을 달리 취함
  useEffect(() => {
    if (isAuthenticated) {
      console.log(`인증 성공! ${location.pathname}로 이동할 것임`);
      navigate(location.pathname);
    } else if (isAuthenticated === false) {
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