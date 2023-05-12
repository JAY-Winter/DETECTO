import React from 'react'
import { getToken } from "firebase/messaging";
import { messaging } from '@/firebase-init';
import useAxios from './useAxios';
import { RequestObj } from 'AxiosRequest';

function useGetFCMToken() {
  const [data, isLoading, setRequestObj] = useAxios({baseURL: ""});

  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Generate Token
      const token = await getToken(messaging, {
        vapidKey:
          "BKszBO0YDR9Cs_PKDtwskomTr9mkcamydkhz_UWUCZrJQJBcQ3BUaRvcxboXhjw10rVUknAu23jMBT5iLdFNj8o",
      });

      // 받아온 토큰값을 서버로 전송
      const requestObj: RequestObj = {
        url: "",
        method: "post",
        body: {
          fcmToken: token
        }
      }
      setRequestObj(requestObj);
    }
  }

  return [requestPermission] as const;
}

export default useGetFCMToken