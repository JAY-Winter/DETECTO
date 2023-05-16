const pushHandler = (event) => {
  // const { title, body } = event.data.json();
  // const options = {
  //   body: body,
  //   icon: '/icons/icon-512x512.png',
  //   vibrate: [100, 50, 100],
  //   data: {
  //     dateOfArrival: Date.now()
  //   },
  //   actions: [
  //     {
  //       action: 'confirm',
  //       title: '확인'
  //     },
  //     {
  //       action: 'close',
  //       title: '닫기'
  //     },
  //   ],
  // };
  // event.waitUntil(self.registration.showNotification(title, options));

  const { title, body } = event.data.json();
  event.waitUntil(self.registration.showNotification(title, {body}));
};

self.addEventListener('push', pushHandler);