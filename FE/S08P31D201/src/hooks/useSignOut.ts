import React, { useEffect, useState } from 'react'
import useAxios from './useAxios'
import { RequestObj } from 'AxiosRequest';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import authState from '@/store/authState';
import { UserInfo } from '@/store/userInfoStroe';

function useSignOut() {
  const setIsAuthenticated = useSetRecoilState(authState);
  const userInfo = useRecoilValue(UserInfo);
  const finallyHandler = () => {
    setIsAuthenticated(false);
    setIsFire(false);
  }
  const [data, isLoading, setRequestObj] = useAxios({finallyHandler: finallyHandler, baseURL: "https://k8d201.p.ssafy.io/api/"});
  const [isFire, setIsFire] = useState(false);

  useEffect(() => {
    if (isFire === true) {
      const requestObj: RequestObj = {
        url: "user/logout",
        method: 'post',
        body: {
          id: userInfo.id,
          password: null,
          fcmToken: null
        }
      }
      setRequestObj(requestObj);
    }
  }, [isFire])

  return setIsFire;
}

export default useSignOut