document.addEventListener("DOMContentLoaded", function () {
    const loader = document.getElementById("loader");
    window.onload = function () {
    setTimeout(function () {
        loader.style.display = "none";
    }, 1000);
    };
});

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
    const isFontLoaded = document.fonts.check('16px "Zen Maru Gothic"');
    if (!isFontLoaded) {
        const showDetails = confirm('Zen Maru Gothicフォントが読み込めない可能性があります。\n詳細を表示しますか？');
        if (showDetails) {
        alert('この問題は、ネットワーク接続やGoogle Fontsサービスの一時的な停止による可能性があります。\nまた、お使いのデバイスが高度なサイバー攻撃から保護されている可能性があります。\n\nフォールバックフォントが適用されています。');
        }
    } else {
        console.log('Zen Maru Gothicフォントが正常に読み込まれました。');
    }
    }, 2000);
});