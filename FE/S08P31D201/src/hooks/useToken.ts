import React from 'react'
import { useRecoilState } from 'recoil';
import { UserInfo } from '@/store/userInfoStroe';

function useToken() {
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);

  const getSubscribe = async () => {
    if ('serviceWorker' in navigator) {
      await navigator.serviceWorker.register("yh-service-worker.js");
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        // 서버로 subscription객체 전송
        const keys = subscription.toJSON().keys;
        if (keys && 'p256dh' in keys && 'auth' in keys) {
          console.log("endpoint:", subscription.endpoint);
          console.log("p256dh:", keys.p256dh);
          console.log("auth:", keys.auth);
        }
      } else {
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,  // 이거 뭐지??
          applicationServerKey: "BNTfmBKaXrAYZD2GMXsIs4I4BzvvJcR4yJRkJ9SN1xUmO0kTxB1OgSpe0njYaBpaW-SvJipp5oYlyUXn8-9v3LE"
        })
        const keys = subscription.toJSON().keys;
        if (keys && 'p256dh' in keys && 'auth' in keys) {
          console.log("endpoint:", subscription.endpoint);
          console.log("p256dh:", keys.p256dh);
          console.log("auth:", keys.auth);
        }
      }
    }
  }

  return getSubscribe;
}

export default useToken