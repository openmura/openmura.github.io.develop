document.addEventListener("DOMContentLoaded", () => {
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const today = new Date();
  const minDate = formatDate(today);

  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30);
  const maxDateString = formatDate(maxDate);

  const dateInput = document.getElementById("cookie-expiry");

  if (dateInput) {
    if (dateInput.type === "date") {
      dateInput.min = minDate;
      dateInput.max = maxDateString;
    } else {
      dateInput.placeholder = `${minDate} - ${maxDateString}`;
      dateInput.addEventListener("input", (event) => {
        const value = event.target.value;
        if (value < minDate || value > maxDateString) {
          alert(`日付は ${minDate} から ${maxDateString} の間で選択してください。`);
          event.target.value = "";
        }
      });
    }
  }
});
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    const userAgreed = getCookie("userAgreed");
    return userAgreed ? true : false;
}

function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.style.display = "block";
    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
    const homePage = document.getElementById("home-page");
    const rulesPage = document.getElementById("rules-page");
    const agreeButton = document.getElementById("agree-button");
    const expiryInput = document.getElementById("cookie-expiry");

    if (!checkCookie()) {
        homePage.style.display = 'none';
        rulesPage.style.display = 'block';
    } else {
        homePage.style.display = 'block';
        rulesPage.style.display = 'none';
    }

    agreeButton.addEventListener("click", () => {
        const selectedDate = expiryInput.value;
        if (!selectedDate) {
            alert("有効期限の日付を選択してください。");
            return;
        }

        const expiryDate = new Date(selectedDate);
        const currentDate = new Date();
        const diffDays = Math.ceil((expiryDate - currentDate) / (1000 * 3600 * 24));

        setCookie("userAgreed", "true", diffDays);

        showNotification("Cookieが設定されました！");

        rulesPage.style.display = 'none';
        homePage.style.display = 'block';
    });
});
