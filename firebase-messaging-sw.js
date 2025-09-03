// firebase-messaging-sw.js
// This file MUST be in your root directory (same level as index.html)
console.log('Service worker loaded');

// This is required for Firebase Messaging
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});

// This handles background notifications
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received');
  
  const data = event.data.json();
  const title = data.notification ? data.notification.title : 'New Forex Signal!';
  const options = {
    body: data.notification ? data.notification.body : data.data.body,
    icon: 'https://i.imgur.com/ROu3.png',
    badge: 'https://i.imgur.com/ROu3.png',
    data: {
      url: self.location.origin
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
