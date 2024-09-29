(function () {

    // Modal HTML'ini oluştur
    const modalHTML = `
 <div
      class=""
      id="ikas-popup-container"
      style="
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        inset: 0px;
        z-index: 2147483644;
        overflow: hidden;
        padding: 20px;
        opacity: 1;
        visibility: visible;
        transition: opacity 0.3s, visibility 0.3s;
      "
    >
      <div
        style="
          position: relative;
          z-index: 2147483646;
          background-color: rgb(255, 255, 255);
          border-radius: 4px;
          max-width: 100%;
          max-height: 100%;
          min-height: 10px;
          overflow: auto;
          opacity: 1;
          visibility: visible;
          transition: opacity 0.3s, visibility 0.3s;
        "
      >
        <div
          style="
            position: absolute;
            float: none;
            top: 8px;
            right: 8px;
            z-index: 2147483647;
          "
        >
          <div
            class=""
            style="
              position: sticky;
              padding: 6px;
              display: flex;
              justify-content: center;
              align-items: center;
              border: 1px solid rgb(0, 0, 0);
              border-radius: 50%;
              background-color: rgb(255, 255, 255);
            "
          >
            <svg
              class="icon"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style="color: rgb(0, 0, 0); cursor: pointer"
            >
              <path
                d="M15 4.99998L5 15M5 4.99998L15 15"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
        </div>
        <div
          style="display: flex; flex-direction: row-reverse; overflow: hidden"
        >
          <div
            style="
              width: 400px;
              max-width: 100%;
              overflow: auto;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              padding: 20px;
            "
          >
            <a
              target="_blank"
              style="
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0px;
                max-width: 100%;
              "
              ><img
                src="https://cdn.myikas.com/images/theme-images/2c8d4917-c322-4611-a0b5-461b8e6681a4/image_540.webp"
                style="border-radius: 0px; object-fit: contain; width: 39%"
            /></a>
            <div
              style="
                border: 0px solid rgb(0, 0, 0);
                border-radius: 15px;
                padding: 0px;
              "
            >
              <div
                style="
                  color: rgb(0, 0, 0);
                  font-size: 42px;
                  font-weight: 500;
                  font-family: 'Fira Sans Condensed', -apple-system, system-ui,
                    BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
                    Arial, sans-serif;
                  text-align: center;
                  padding: 10px 0px;
                "
              >
                Tüm Kredi Kartlarına  12 Taksit İmkanıyla!
              </div>
            </div>
            <div
              style="
                border: 0px solid rgb(0, 0, 0);
                border-radius: 4px;
                padding: 0px;
              "
            >
              <div
                style="
                  color: rgb(0, 0, 0);
                  font-size: 20px;
                  font-weight: 400;
                  font-family: 'Work Sans', -apple-system, system-ui,
                    BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
                    Arial, sans-serif;
                  text-align: center;
                  padding: 10px 6px;
                "
              >
                Siparişlerinizde %80'e varan indirimlerden ömür boyu yararlanın ve
                güncellemeler için kaydolun!
              </div>
            </div>
            <div
              style="
                display: flex;
                flex-direction: column;
                justify-content: center;
                gap: 16px;
                padding: 0px;
                width: 100%;
              "
            >
              <div
                style="
                  display: flex;
                  flex-direction: row;
                  width: 100%;
                  gap: 16px;
                "
              >
                <div
                  style="
                    flex: 1 1 0%;
                    display: flex;
                    align-items: flex-end;
                    font-family: 'Work Sans', -apple-system, system-ui,
                      BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
                      Arial, sans-serif;
                    font-size: 14px;
                  "
                >
                  <div
                    style="
                      width: 100%;
                      display: flex;
                      gap: 2px;
                      flex-direction: column;
                    "
                  >
                    <div
                      style="
                        display: flex;
                        flex-direction: column;
                        gap: 4px;
                        margin-bottom: 6px;
                      "
                    >
                      <div
                        style="
                          display: flex;
                          flex-direction: row;
                          align-items: center;
                          gap: 4px;
                        "
                      ></div>
                    </div>
                    <input
                      type="text"
                      placeholder="E-posta *"
                      value=""
                      style="
                        background-color: transparent;
                        border: 1px solid rgb(227, 232, 239);
                        border-radius: 4px;
                        font-size: 14px;
                        padding: 10px 12px;
                        height: 40px;
                        outline: none;
                      "
                    />
                  </div>
                </div>
              </div>
              <div
                style="
                  display: flex;
                  flex-direction: row;
                  width: 100%;
                  gap: 16px;
                "
              >
                <div
                  style="
                    flex: 1 1 0%;
                    display: flex;
                    align-items: flex-end;
                    font-family: 'Work Sans', -apple-system, system-ui,
                      BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
                      Arial, sans-serif;
                    font-size: 14px;
                  "
                >
                  <div
                    style="
                      width: 100%;
                      display: flex;
                      gap: 6px;
                      flex-direction: column;
                    "
                  >
                    <div
                      style="
                        width: 100%;
                        display: flex;
                        gap: 8px;
                        flex-direction: row;
                        align-items: baseline;
                        word-break: break-word;
                      "
                    >
                      <input
                        type="checkbox"
                        style="
                          width: 16px;
                          height: 16px;
                          cursor: pointer;
                          position: relative;
                          top: 3px;
                        "
                      />
                      <div>Kullanım Koşullarını kabul ediyorum</div>
                    </div>
                  </div>
                </div>
              </div>
              <div style="width: 100%; min-width: fit-content">
                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0px;
                  "
                >
                  <a
                    target="_self"
                    style="width: 100%; min-width: fit-content; cursor: pointer"
                    ><div
                      style="
                        color: rgb(255, 255, 255);
                        background-color: rgb(0,0,0);
                        font-size: 16px;
                        font-weight: 500;
                        font-family: 'Work Sans', -apple-system, system-ui,
                          BlinkMacSystemFont, 'Segoe UI', Roboto,
                          'Helvetica Neue', Arial, sans-serif;
                        text-align: center;
                        border: 0px solid rgb(0, 0, 0);
                        border-radius: 4px;
                        padding: 12px;
                      "
                    >
                      Kayıt Ol
                    </div></a
                  >
                </div>
              </div>
            </div>
            <div
              style="
                border: 0px solid rgb(0, 0, 0);
                border-radius: 4px;
                padding: 0px;
              "
            >
              <div
                style="
                  color: rgb(139, 139, 139);
                  font-size: 10px;
                  font-weight: 400;
                  font-family: 'Work Sans', -apple-system, system-ui,
                    BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
                    Arial, sans-serif;
                  text-align: left;
                  padding: 10px 0px;
                "
              >
                E-posta adresinizi girerek pazarlama ve tanıtım ile ilgili
                iletişim almayı kabul edersiniz ve Gizlilik Politikamızı
                okuduğunuzu ve kabul ettiğinizi onaylarsınız.
              </div>
            </div>
          </div>

        </div>
      </div>
      <div
        style="
          position: fixed;
          inset: 0px;
          z-index: 2147483645;
          background-color: rgb(54, 65, 82);
          opacity: 0.26;
        "
      ></div>
    </div>
    `;



    // Modal'ı sayfaya ekle ve olayları yönet
    function initializeNewsletterModal() {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        const modalElement = document.getElementById('ikas-popup-container');
        const closeButton = modalElement.querySelector('svg.icon');
        const form = modalElement.querySelector('form');
        const emailInput = modalElement.querySelector('input[type="text"]');
        const subscriptionCheckbox = modalElement.querySelector('input[type="checkbox"]');
        const submitButton = modalElement.querySelector('a[target="_self"]');

        function showModal() {
            modalElement.style.display = 'flex';
        }

        function hideModal() {
            modalElement.style.display = 'none';
        }

        // Show modal after 300px scroll
        let modalShown = false;
        window.addEventListener('scroll', () => {
            if (!modalShown && window.scrollY > 300 && !localStorage.getItem('newsletterSubscribed') && !localStorage.getItem('doNotShowNewsletter')) {
                showModal();
                modalShown = true;
            }
        });

        // Handle form submission
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            const email = emailInput.value;
            const subscribed = subscriptionCheckbox.checked;

            if (!email || !subscribed) {
                alert('Lütfen e-posta adresinizi girin ve kullanım koşullarını kabul edin.');
                return;
            }

            // Send GraphQL mutation
            fetch('https://api.myikas.com/api/sf/graphql?op=saveCustomerFormData', {
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
                        mutation saveCustomerFormData (
                            $input: SaveCustomerFormDataInput!,
                        ) {
                            saveCustomerFormData (
                                input: $input,
                            )
                        }
                    `,
                    variables: {
                        input: {
                            email: email,
                            firstName: "",
                            lastName: "",
                            birthDate: "",
                            phone: "",
                            subscriptions: {
                                email: true,
                                phone: true,
                                sms: true
                            },
                            captchaToken: null
                        }
                    }
                })
            })
                .then(response => response.json())
                .finally(() => {
                    localStorage.setItem('newsletterSubscribed', 'true');
                    hideModal();
                    hideCountdown();
                    alert('Tebrikler! Bültenimize başarıyla kaydoldunuz.');
                });
        });

        // Close button event listener
        closeButton.addEventListener('click', hideModal);
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