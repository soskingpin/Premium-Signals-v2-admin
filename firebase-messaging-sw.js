// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyA6A67d0YBJlhcT9GUGRVHMzGue1BM2rsA",
  authDomain: "forex-signals-platform.firebaseapp.com",
  projectId: "forex-signals-platform",
  storageBucket: "forex-signals-platform.firebasestorage.app",
  messagingSenderId: "655334374318",
  appId: "1:655334374318:web:d107dbf37ab1e31e1c663f",
  measurementId: "G-P7RWPEPQ4V"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification ? payload.notification.title : 'New Forex Signal!';
  const notificationOptions = {
    body: payload.notification ? payload.notification.body : payload.data.body,
    icon: 'https://i.imgur.com/ROu3.png',
    badge: 'https://i.imgur.com/ROu3.png',
    data: {
      click_action: payload.data.click_action || window.location.href,
      signal_id: payload.data.signal_id
    }
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
