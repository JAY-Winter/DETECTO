import React from 'react'
import { getToken } from "firebase/messaging";
import { messaging } from '@/firebase-init';
import { useRecoilState } from 'recoil';
import { UserInfo } from '@/store/userInfoStroe';

function useGetFCMToken() {
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);

  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // 토큰 생성
      const token = await getToken(messaging, {
        vapidKey:
          "BKszBO0YDR9Cs_PKDtwskomTr9mkcamydkhz_UWUCZrJQJBcQ3BUaRvcxboXhjw10rVUknAu23jMBT5iLdFNj8o",
      });

      // 생성한 토큰 userInfo에 저장
      setUserInfo((oldState) => {
        return {
          ...oldState,
          fcmToken: token
        }
      })
    }
  }

  return [requestPermission] as const;
}

export default useGetFCMToken