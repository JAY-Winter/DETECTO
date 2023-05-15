const pushHandler = async (e) => {
  const data = e.data.json();
  const { title, body } = data.notification;
  const notificationOptions = {
    body: body,
  };
  self.registration.showNotification(title, notificationOptions);
};

self.addEventListener('push', pushHandler);