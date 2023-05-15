import React from 'react'

function usePush() {
  const getSubscription = async () => {
    if ('serviceWorker' in navigator) {
      await navigator.serviceWorker.register("yh-service-worker.js");
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        const keys = subscription.toJSON().keys;
        if (keys && 'p256dh' in keys && 'auth' in keys) {
          console.log("endpoint:", subscription.endpoint);
          console.log("p256dh:", keys.p256dh);
          console.log("auth:", keys.auth);
        }
        // 기존 subscription 객체 반환
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

  return getSubscription;
}

export default usePush