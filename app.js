let deferredPrompt;
const installBtn = document.getElementById('install-btn');

// Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the default install prompt
  e.preventDefault();
  // Save the event so it can be triggered later
  deferredPrompt = e;
  
  // Show the install button (optional)
  installBtn.style.display = 'block';

  installBtn.addEventListener('click', () => {
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      console.log(choiceResult.outcome);
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  });
});
