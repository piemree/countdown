(function () {
    // Poppins fontunu yükle
    function loadPoppinsFont() {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }

    // Bootstrap'i yükle (eğer sayfada yoksa)
    function loadBootstrap() {
        return new Promise((resolve) => {
            if (typeof bootstrap !== 'undefined') {
                resolve();
                return;
            }
            const link = document.createElement('link');
            link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css';
            link.rel = 'stylesheet';
            document.head.appendChild(link);

            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js';
            script.onload = resolve;
            document.head.appendChild(script);
        });
    }

    // Stil ekle
    function addStyles() {
        const style = document.createElement('style');
        style.textContent = `
          body, #countdown, #newsletterModal {
            font-family: 'Poppins', sans-serif;
          }
          #countdown {
            font-weight: 600;
          }
          #newsletterModal .modal-title {
            font-weight: 600;
          }
          #newsletterModal .list-group-item {
            display: flex;
            align-items: center;
          }
          #newsletterModal .list-group-item i {
            margin-right: 10px;
          }
        `;
        document.head.appendChild(style);

        // Bootstrap Icons'u ekle
        const link = document.createElement('link');
        link.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }

    // Modal HTML'ini oluştur
    const modalHTML = `
    <div class="modal fade" id="newsletterModal" tabindex="-1" aria-labelledby="newsletterModalLabel" aria-hidden="true" style="z-index:999999">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="newsletterModalLabel">Sınırlı Süre Fırsatı Kaçırma!</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="text-danger fw-bold" id="modalCountdown"></p>
            <p>E-posta adresinizi bırakarak aşağıdaki avantajlardan <span class="text-success fw-bold">ömür boyu</span> yararlanın:</p>
            <ul class="list-group mb-3">
              <li class="list-group-item"><i class="bi bi-check-circle-fill text-success"></i> Tüm Ürünlerde Ücretsiz Kargo</li>
              <li class="list-group-item"><i class="bi bi-check-circle-fill text-success"></i> %80'e Varan İndirimler</li>
              <li class="list-group-item"><i class="bi bi-check-circle-fill text-success"></i> 5000 TL ve Üzeri Sepette %20 İndirim</li>
            </ul>
            <form id="newsletterForm">
              <div class="mb-3">
                <label for="email" class="form-label">E-posta Adresiniz</label>
                <input type="email" class="form-control" id="email" required placeholder="ornek@email.com">
              </div>
              <button type="submit" class="btn btn-black w-100">Fırsatları Kaçırma!</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-link text-muted" id="doNotShowAgain">Bir daha gösterme</button>
          </div>
        </div>
      </div>
    </div>
  `;

    function getCountdownTime() {
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0);
        let timeDiff = midnight - now;

        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Modal'ı sayfaya ekle ve olayları yönet
    function initializeNewsletterModal() {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        const modalElement = document.getElementById('newsletterModal');
        const modal = new bootstrap.Modal(modalElement);
        const form = document.getElementById('newsletterForm');
        const doNotShowAgainBtn = document.getElementById('doNotShowAgain');
        const modalCountdownElement = document.getElementById('modalCountdown');



        // Countdown'u güncelle
        function updateModalCountdown() {
            const timeString = getCountdownTime();
            modalCountdownElement.textContent = `Bu fırsattan yararlanabilmek için son ${timeString}`;
        }

        // Modal açıldığında countdown'u başlat
        modalElement.addEventListener('shown.bs.modal', () => {
            updateModalCountdown();
            // Her saniye countdown'u güncelle
            const countdownInterval = setInterval(updateModalCountdown, 1000);

            // Modal kapandığında interval'i temizle
            modalElement.addEventListener('hidden.bs.modal', () => {
                clearInterval(countdownInterval);
            }, { once: true });
        });


        // Scroll olayını dinle
        let modalShown = false;
        window.addEventListener('scroll', () => {
            if (!modalShown && window.scrollY > 300 && !localStorage.getItem('newsletterSubscribed') && !localStorage.getItem('doNotShowNewsletter')) {
                modal.show();
                modalShown = true;
            }
        });

        // Form gönderimini dinle
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;

            // GraphQL mutation'ı gönder
            fetch('https://api.myikas.com/api/sf/graphql?op=subscribeToMarketingNotifications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                    'Referer': 'https://dm-kimya.com/',
                    'User-Agent': navigator.userAgent,
                    'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtIjoiODZkYjk4YTAtMDMzMC00ZTY5LWI1NmQtZGE3YTliOGExZTdmIiwic2YiOiIxMmNiMjliNi1hMGE4LTQ1ZWYtYmJjMy03NmVlZWI4OGQxOGYiLCJzZnQiOjEsInNsIjoiNGUwYWUxZWQtZDI3Ny00N2QzLWIwZDQtNDJlZDUzYzk4NDMyIn0.qWzNEXlNC0nOEwxWZtxWV_rZ5-XIfsGOoeHKDcZbW0c',
                    'x-sfid': '12cb29b6-a0a8-45ef-bbc3-76eeeb88d18f',
                    'x-sfrid': generateUUID(), // Her istek için yeni bir UUID oluştur
                    'x-sid': generateUUID(), // Her istek için yeni bir UUID oluştur
                    'x-vid': generateUUID(), // Her istek için yeni bir UUID oluştur
                },
                body: JSON.stringify({
                    query: `
                mutation subscribeToMarketingNotifications(
                  $input: SubscribeToMarketingNotificationsInput!
                ) {
                  subscribeToMarketingNotifications(
                    input: $input
                  )
                }
              `,
                    variables: {
                        input: {
                            email: email,
                            captchaToken: null
                        }
                    }
                })
            })
                .then(response => response.json())
                .finally(() => {
                    localStorage.setItem('newsletterSubscribed', 'true');
                    modal.hide();
                    alert('Tebrikler! Özel fırsatlardan ömür boyu yararlanmak için bültenimize başarıyla kaydoldunuz.');
                    hideCountdown();
                });
        });

        // "Bir daha gösterme" butonunu dinle
        doNotShowAgainBtn.addEventListener('click', () => {
            localStorage.setItem('doNotShowNewsletter', 'true');
            modal.hide();
        });
    }


    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Countdown'u gizle
    function hideCountdown() {
        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            countdownElement.style.display = 'none';
        }
    }

    // Script'i başlat
    function init() {
        loadPoppinsFont();
        addStyles();
        if (localStorage.getItem('newsletterSubscribed')) {
            hideCountdown();
        } else {
            loadBootstrap().then(initializeNewsletterModal);
        }
    }

    // Sayfa yüklendiğinde script'i başlat
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();