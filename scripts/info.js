document.addEventListener("DOMContentLoaded", () => {
    const versionHistoryText = `
ver. 8.2.1
Last-Updated:2024/12/16 17:58 JST


history
ver. 1.0.0 ページを公開

ver. 2.0.0 rule,serを公開
ver. 2.0.1 軽微な修正
ver. 2.1.0 ruleの表記変更

ver. 3.0.0 serの背景画像の修正

ver. 4.0.0 rootを公開、それに伴い各Pageのヘッダーの修正

ver. 5.0.0 infoを公開

ver. 6.0.0 infoの情報を追加

ver. 7.0.0 infoの情報の追加、修正
ver. 7.0.1 urlのヘッダーの修正
ver. 7.0.2 ヘッダーの修正
ver. 7.1.0 URLへ飛べない問題を修正

ver. 8.0.0 階層の最適化
ver. 8.1.0 infoの仕組みの変更
ver. 8.1.1 infoの最適化
ver. 8.1.2 参照の修正
ver. 8.1.3 表示のバグの修正
ver. 8.2.0 infoの表示の変更
ver. 8.2.1 軽微な修正


製作者:佐原

©2024 openmura


`;
    const textElement = document.getElementById("animated-text");
    let index = 0;

    function typeCharacter() {
        if (index < versionHistoryText.length) {
            textElement.textContent += versionHistoryText[index];
            index++;
            setTimeout(typeCharacter, 50);
        }
    }

    typeCharacter();

    window.chkBrowserAppNameVer = function () {
        const result = navigator.appName + " " + navigator.appVersion;
        document.getElementById("resChkBrowserAppNameVer").textContent = result;
    };

    window.chkUserAgent = function () {
        const userAgent = navigator.userAgent;
        document.getElementById("resChkUserAgent").textContent = userAgent;
    };

    const javaStatus = navigator.javaEnabled() ? "Java有効" : "Java無効";
    document.getElementById("java-status").textContent = javaStatus;

    const taintStatus =
        typeof navigator.taintEnabled === "function" && navigator.taintEnabled()
            ? "非通知データ送信可"
            : "非通知データ送信不可";
    document.getElementById("taint-status").textContent = taintStatus;
});
