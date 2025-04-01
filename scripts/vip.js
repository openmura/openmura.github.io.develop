window.onload = function() {
    if (localStorage.getItem("agree")) {
        document.getElementById("userName").innerHTML = `${localStorage.getItem("userName")}`;
        const now = new Date();
        localStorage.setItem("lastVisited", formatDate(now.toISOString()));
        document.getElementById("lastVisited").innerHTML = localStorage.getItem("lastVisited") ;
        document.getElementById("agreeDate").innerHTML = localStorage.getItem("agreeDate") ;
    } else {
        showPopup()    }
};

function formatDate(isoString){
    const date = new Date(isoString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2 , '0');
    const dd = String(date.getDate()).padStart(2,'0');
    const hh = String(date.getHours()).padStart(2,'0');
    const mi = String(date.getMinutes()).padStart(2,'0');
    const ss = String(date.getSeconds()).padStart(2,'0');

    return `${yyyy}/${mm}/${dd} ${hh}:${mi}:${ss}`;
}

function showPopup() {
    document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function agree() {
    localStorage.setItem("agree", "true");
    if (localStorage.getItem("agreeDate")) {
        alert("既に同意しています。")
    } else {
        const agreeDate = new Date();
        localStorage.setItem("agreeDate", formatDate(agreeDate.toISOString()));
    }
    closePopup()
}

function disagree() {
    localStorage.clear();
    document.body.innerHTML = "<h1>アクセス拒否</h1><p>このページにはアクセスできません。</p>";
    return;
}

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

function userPopup() {
    if (localStorage.getItem("userName")) {
        document.getElementById('userPopup').style.display = 'flex';
    } else {
        document.getElementById('agreePopup').style.display = 'flex';
    }
}

function webAgree() {
    var userName = prompt("username","guest");
    localStorage.setItem("userName", userName);
    disAgree()
}

function disAgree() {
    document.getElementById('agreePopup').style.display = 'none';
}

function userClose(){
    document.getElementById('userPopup').style.display = 'none';
}

function userDel() {
    disagree()
}