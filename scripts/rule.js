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
        alert("既に同意しています。");
    } else {
        const agreeDate = new Date();
        localStorage.setItem("agreeDate", formatDate(agreeDate.toISOString()));
        location.href ="";
    }
    alert("ルールを確認したところへ送信してください");
    location.href = "https://line.me/R/msg/text/%2F%E3%83%AB%E3%83%BC%E3%83%AB%E8%A6%8B%E3%81%9F%E3%82%88%EF%BC%81";
    location.href = "https://openmura.github.io"
    closePopup()
}

function disagree() {
    localStorage.clear();
    document.body.innerHTML = "<h1>アクセス拒否</h1><p>このページにはアクセスできません。</p>";
    return;
}

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
    location.href="";
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