document.addEventListener("DOMContentLoaded", () => {
    const homePage = document.getElementById("home-page");
    const rulesPage = document.getElementById("rules-page");
    const agreeButton = document.getElementById("agree-button");
    const expiryInput = document.getElementById("cookie-expiry");

    const today = new Date();
    const minDate = today.toISOString().split("T")[0];

    const maxDate = new Date();
    maxDate.setDate(today.getDate() +30); 
    const maxDateString = maxDate.toISOString().split("T")[0];

    expiryInput.min = minDate;
    expiryInput.max = maxDateString;

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

        if (expiryDate < currentDate) {
            alert("有効期限は未来の日付を選択してください。");
            return;
        }

        const diffDays = Math.ceil((expiryDate - currentDate) / (1000 * 3600 * 24));
        setCookie("userAgreed", "true", diffDays);

        showNotification("Cookieが設定されました！");

        rulesPage.style.display = 'none';
        homePage.style.display = 'block';
    });
});