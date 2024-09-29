(function () {
  let settings = {
    position: "sticky",
    top: "0",
    left: "0",
    width: "100%",
    backgroundColor: "#000000",
    color: "#ffffff",
    fontWeight: "bold",
    padding: "10px 0",
    textAlign: "center",
    fontSize: "16px",
    zIndex: "1000",
    message: "İNDİRİMLER İÇİN SON:",
  };


  function createCountdownElement() {
    const countdownElement = document.createElement("div");
    countdownElement.id = "countdown";
    document.body.insertBefore(countdownElement, document.body.firstChild);
    return countdownElement;
  }

  function applyStyles(element) {
    Object.keys(settings).forEach((key) => {
      if (key !== "message") {
        element.style[key] = settings[key];
      }
    });
  }

  function setupCountdown() {
    let countdownElement = document.getElementById("countdown");
    if (!countdownElement) {
      countdownElement = createCountdownElement();
    }

    applyStyles(countdownElement);

    function updateCountdown() {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      let timeDiff = midnight - now;
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      const timeString = [hours, minutes, seconds]
        .map((v) => (v < 10 ? "0" + v : v))
        .join(":");
      countdownElement.textContent = `${settings.message} ${timeString}`;
      requestAnimationFrame(updateCountdown);
    }

    updateCountdown();
  }


  // DOM yüklendikten sonra çalıştır
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      setupCountdown()
    });
  } else {
    setupCountdown();
  }

  // Global nesnelere erişim sağla
  window.countdownSettings = {
    current: () => Object.assign({}, settings),
  };
})();
