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
      // モバイルブラウザでサポートされていない場合のフォールバック
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