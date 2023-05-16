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
          const endpoint = subscription.endpoint;
          const p256dh = keys.p256dh;
          const auth = keys.auth;
          return [endpoint, p256dh, auth];
        }
      } else {
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,  // 이거 뭐지??
          applicationServerKey: "BNTfmBKaXrAYZD2GMXsIs4I4BzvvJcR4yJRkJ9SN1xUmO0kTxB1OgSpe0njYaBpaW-SvJipp5oYlyUXn8-9v3LE"
        })
        const keys = subscription.toJSON().keys;
        if (keys && 'p256dh' in keys && 'auth' in keys) {
          const endpoint = subscription.endpoint;
          const p256dh = keys.p256dh;
          const auth = keys.auth;
          return [endpoint, p256dh, auth];
        }
      }
    }
    return [undefined, undefined, undefined];
  }

  return getSubscription;
}

export default usePush