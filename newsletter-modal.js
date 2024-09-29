(function () {


    function addModalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #newsletterModal {
                font-family: 'Poppins', sans-serif;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.5);
                display: none;
                z-index: 999999;
            }
            #newsletterModal.show {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            #newsletterModalLabel{
                font-size: 1.5rem;
                font-weight: 600;
            }

            #newsletterModal .modal-dialog {
                background-color: #fff;
                border-radius: 5px;
                max-width: 500px;
                width: 100%;
                margin: 10px;
            }
            #newsletterModal .modal-content {
                position: relative;
            }
            #newsletterModal .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem;
                border-bottom: 1px solid #dee2e6;
            }
            #newsletterModal .modal-title {
                margin: 0;
                font-weight: 600;
            }
            #newsletterModal .btn-close {
                background: transparent;
                border: 0;
                font-size: 1.5rem;
                cursor: pointer;
            }
            #newsletterModal .modal-body {
                padding: 1rem;
            }
            #newsletterModal .modal-footer {
                padding: 1rem;
                border-top: 1px solid #dee2e6;
                text-align: right;
            }
            #newsletterModal .list-group {
                list-style-type: none;
                padding: 0;
            }
            #newsletterModal .list-group-item {
                display: flex;
                align-items: center;
                padding: 0.5rem 0;
            }
            #newsletterModal .list-group-item i {
                margin-right: 10px;
                color: #28a745;
            }
            #newsletterModal .form-label {
                display: block;
                margin-bottom: 0.5rem;
            }
            #newsletterModal .form-control {
                display: block;
                width: -webkit-fill-available;
                padding: 0.375rem 0.75rem;
                font-size: 1rem;
                line-height: 1.5;
                border: 1px solid #ced4da;
                border-radius: 0.25rem;
            }
            #newsletterModal .btn {
                display: inline-block;
                font-weight: 400;
                text-align: center;
                vertical-align: middle;
                cursor: pointer;
                padding: 0.375rem 0.75rem;
                font-size: 1rem;
                line-height: 1.5;
                border-radius: 0.25rem;
                transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
                margin-top: 10px;
            }
            #newsletterModal .btn-black {
                color: #fff;
                background-color: #000;
                border-color: #000;
            }
            #newsletterModal .btn-link {
                font-weight: 400;
                color: #007bff;
                text-decoration: none;
                background-color: transparent;
                border: 0;
            }
            #newsletterModal .text-danger {
                color: #dc3545;
            }
            #newsletterModal .text-success {
                color: #28a745;
            }
            #newsletterModal .fw-bold {
                font-weight: 700;
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
    <div id="newsletterModal" class="modal" tabindex="-1" aria-labelledby="newsletterModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="newsletterModalLabel">Sınırlı Süre Fırsatı Kaçırma!</h5>
            <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">&times;</button>
          </div>
          <div class="modal-body">
            <p class="text-danger fw-bold" id="modalCountdown"></p>
            <p>E-posta adresinizi bırakarak aşağıdaki avantajlardan <span class="text-success fw-bold">ömür boyu</span> yararlanın:</p>
            <ul class="list-group mb-3">
              <li class="list-group-item"><i class="bi bi-check-circle-fill"></i> Tüm Ürünlerde Ücretsiz Kargo</li>
              <li class="list-group-item"><i class="bi bi-check-circle-fill"></i> %80'e Varan İndirimler</li>
              <li class="list-group-item"><i class="bi bi-check-circle-fill"></i> 5000 TL ve Üzeri Sepette %20 İndirim</li>
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
        const closeButton = modalElement.querySelector('.btn-close');
        const form = document.getElementById('newsletterForm');
        const doNotShowAgainBtn = document.getElementById('doNotShowAgain');
        const modalCountdownElement = document.getElementById('modalCountdown');

        function showModal() {
            modalElement.classList.add('show');
        }

        function hideModal() {
            modalElement.classList.remove('show');
        }

        // Countdown'u güncelle
        function updateModalCountdown() {
            const timeString = getCountdownTime();
            modalCountdownElement.textContent = `Bu fırsattan yararlanabilmek için son ${timeString}`;
        }

        // Modal açıldığında countdown'u başlat
        let countdownInterval;
        function startCountdown() {
            updateModalCountdown();
            countdownInterval = setInterval(updateModalCountdown, 1000);
        }

        // Modal kapandığında interval'i temizle
        function stopCountdown() {
            clearInterval(countdownInterval);
        }

        // Scroll olayını dinle
        let modalShown = false;
        window.addEventListener('scroll', () => {
            if (!modalShown && window.scrollY > 300 && !localStorage.getItem('newsletterSubscribed') && !localStorage.getItem('doNotShowNewsletter')) {
                showModal();
                startCountdown();
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
                    'x-sfrid': generateUUID(),
                    'x-sid': generateUUID(),
                    'x-vid': generateUUID(),
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
                    hideModal();
                    stopCountdown();
                    alert('Tebrikler! Özel fırsatlardan ömür boyu yararlanmak için bültenimize başarıyla kaydoldunuz.');
                    hideCountdown();
                });
        });

        // "Bir daha gösterme" butonunu dinle
        doNotShowAgainBtn.addEventListener('click', () => {
            localStorage.setItem('doNotShowNewsletter', 'true');
            hideModal();
            stopCountdown();
        });

        // Kapat butonunu dinle
        closeButton.addEventListener('click', () => {
            hideModal();
            stopCountdown();
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
        addModalStyles();
        if (!localStorage.getItem('newsletterSubscribed')) {
            initializeNewsletterModal();
        } else {
            hideCountdown();
        }
    }

    // Sayfa yüklendiğinde script'i başlat
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();