const pushHandler = async (e) => {
  const data = e.data.json();
  const { title, body } = data.notification;
  const options = {
    body: body,
    icon: '/icons/icon-512x512.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now()
    },
    actions: [
      {
        action: 'confirm',
        title: '확인'
      },
      {
        action: 'close',
        title: '닫기'
      },
    ],
  };
  self.registration.showNotification(title, options);
};

self.addEventListener('push', pushHandler);