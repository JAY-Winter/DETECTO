import React, { useEffect, useState } from 'react'
import useAxios from './useAxios'
import { RequestObj } from 'AxiosRequest';
import { useSetRecoilState } from 'recoil';
import authState from '@/store/authState';

function useSignOut() {
  const setIsAuthenticated = useSetRecoilState(authState);
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
        method: 'post'
      }
      setRequestObj(requestObj);
    }
  }, [isFire])

  return setIsFire;
}

export default useSignOut