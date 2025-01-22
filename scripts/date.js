const today = new Date();

const minDate = today.toISOString().split("T")[0];

const maxDate = new Date();
maxDate.setDate(today.getDate() + 30);
const maxDateString = maxDate.toISOString().split("T")[0];

const dateInput = document.getElementById("cookie-expiry");
dateInput.min = minDate;
dateInput.max = maxDateString;