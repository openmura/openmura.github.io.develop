document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const defaultTheme = prefersDarkScheme ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", defaultTheme);
    }

});

window.onload = function() {
    if (localStorage.getItem("agree")) {
        document.getElementById("userName").innerHTML = `${localStorage.getItem("userName")}`;
        const now = new Date();
        localStorage.setItem("lastVisited", formatDate(now.toISOString()));
        document.getElementById("lastVisited").innerHTML = localStorage.getItem("lastVisited") ;
        document.getElementById("agreeDate").innerHTML = localStorage.getItem("agreeDate") ;
    } else {
        alert("⚠️警告⚠️\n\nルールを確認していません。");
        location.href="rule.html"
    }
};