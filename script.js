(function () {
  function createCountdownElement() {
    const countdownElement = document.createElement('div');
    countdownElement.id = 'countdown';
    document.body.insertBefore(countdownElement, document.body.firstChild);
    return countdownElement;
  }

  function setupCountdown() {
    let countdownElement = document.getElementById('countdown');

    if (!countdownElement) {
      countdownElement = createCountdownElement();
    }

    // Stil ayarları
    countdownElement.style.position = 'sticky';
    countdownElement.style.top = '0';
    countdownElement.style.left = '0';
    countdownElement.style.width = '100%';
    countdownElement.style.backgroundColor = '#000000';
    countdownElement.style.color = '#FFFFFF';
    countdownElement.style.fontWeight = 'bold';
    countdownElement.style.padding = '10px 0';
    countdownElement.style.textAlign = 'center';
    countdownElement.style.fontSize = '16px';
    countdownElement.style.zIndex = '1000';

    function updateCountdown() {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);

      let timeDiff = midnight - now;

      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      const timeString = [hours, minutes, seconds]
        .map(v => v < 10 ? "0" + v : v)
        .join(":");

      countdownElement.textContent = `İNDİRİMLER İÇİN SON: ${timeString}`;

      requestAnimationFrame(updateCountdown);
    }

    updateCountdown();
  }

  // DOM yüklendikten sonra çalıştır
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupCountdown);
  } else {
    setupCountdown();
  }
})();