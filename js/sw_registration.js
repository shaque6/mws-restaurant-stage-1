if (navigator.serviceWorker) {
  navigator.serviceWorker.register('sw.js')
  .then(registration => {
    console.log('Registration successful');
  }).catch(error => {
    console.log('Service worker registration failed');
  });
}
