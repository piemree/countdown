function createCountdownElement() {
    var countdownElement = document.createElement("div");
    countdownElement.id = "countdown";
    countdownElement.style.cssText =
      "font-family: Arial, sans-serif; font-size: 24px; font-weight: bold; color: #333; background-color: #f0f0f0; padding: 20px; border-radius: 10px; text-align: center; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); position: fixed; top: 20px; left: 50%; transform: translateX(-50%);";
    document.body.appendChild(countdownElement);
    return countdownElement;
  }

  function updateCountdown(countdownElement, duration) {
    var hours = Math.floor(duration / 3600);
    var minutes = Math.floor((duration % 3600) / 60);
    var seconds = duration % 60;

    var hoursStr = hours < 10 ? "0" + hours : hours;
    var minutesStr = minutes < 10 ? "0" + minutes : minutes;
    var secondsStr = seconds < 10 ? "0" + seconds : seconds;

    countdownElement.textContent =
      "İndirim sona eriyor: " +
      hoursStr +
      ":" +
      minutesStr +
      ":" +
      secondsStr;

    if (duration > 0) {
      setTimeout(function () {
        updateCountdown(countdownElement, duration - 1);
      }, 1000);
    } else {
      countdownElement.textContent = "İndirim sona erdi!";
    }
  }

  function startCountdown() {
    var countdownElement = createCountdownElement();
    var duration = 2 * 60 * 60; // 2 saat
    updateCountdown(countdownElement, duration);
  }

  window.onload = startCountdown;