// `unicode-data.json`の内容（サンプル）
const unicodeData = {
    "1F468": { "name": "MAN", "category": "Lo", "version": "1.1" },
    "1F469": { "name": "WOMAN", "category": "Lo", "version": "1.1" },
    "1F600": { "name": "GRINNING FACE", "category": "So", "version": "6.1" },
    "1F3FB": { "name": "EMOJI MODIFIER FITZPATRICK TYPE-1-2", "category": "Mn", "version": "7.0" }
};

// 結合文字判定
function isCombining(char) {
    const code = char.codePointAt(0);
    return (code >= 0x0300 && code <= 0x036F); // 結合文字の範囲
}

// 制御文字判定
function isControlCharacter(code) {
    return (
        (code >= 0x200B && code <= 0x200F) || // ZWSP, LRM, RLM
        (code >= 0x202A && code <= 0x202E) || // Bidi Control
        (code === 0xFFFE || code === 0xFFFF)  // 異常なUnicodeコードポイント
    );
}

// URLやファイル名チェック
function isFileOrURL(s) {
    const regex = /(?:file:\/\/|data:|\.jp[e]?g|\.png|\.gif|\.svg|\.html|\.js|\.exe|\.mp4)/i;
    return regex.test(s);
}

// 脅威度計算関数
function calculateThreatLevel(hasControl, numCombining, isTooLong, looksLikeFileOrURL) {
    let threatLevel = 0;

    // 制御文字の存在によるリスク評価
    if (hasControl) {
        threatLevel += 1;  // 制御文字
    }

    // 結合文字数によるリスク評価
    if (numCombining >= 4) {
        threatLevel += 2;  // 結合文字が4個以上 (高リスク)
    } else if (numCombining >= 1) {
        threatLevel += 1;  // 結合文字が1～3個 (中リスク)
    }

    // 長い文字列によるリスク評価
    if (isTooLong > 5000) {
        threatLevel += 2;  // 5000文字以上 (高リスク)
    } else if (isTooLong > 1000) {
        threatLevel += 1;  // 1000～5000文字 (中リスク)
    }

    // URLやファイル名が含まれる場合
    if (looksLikeFileOrURL) {
        threatLevel += 2;  // URLやファイル名 (高リスク)
    }

    return threatLevel;
}

function analyze() {
    const s = document.getElementById('input').value;
    const output = document.getElementById('output');
    const splitter = new GraphemeSplitter();

    let hasControl = false;
    let numCombining = 0;
    let isTooLong = s.length > 5000;
    let looksLikeFileOrURL = isFileOrURL(s);
    let badChars = [];

    // 文字列をチェックして脅威要素を数える
    for (let ch of s) {
        const code = ch.codePointAt(0);

        // 制御文字をチェック
        if (isControlCharacter(code)) {
            hasControl = true;
            badChars.push(`U+${code.toString(16).toUpperCase()} (制御文字)`);
        }

        // 結合文字をチェック
        if (isCombining(ch)) {
            numCombining++;
            badChars.push(`U+${code.toString(16).toUpperCase()} (結合文字)`);
        }

        // Unicodeデータを表示する処理
        if (unicodeData[code.toString(16).toUpperCase()]) {
            const { name, category, version } = unicodeData[code.toString(16).toUpperCase()];
            badChars.push(`U+${code.toString(16).toUpperCase()} (${name}, カテゴリ: ${category}, バージョン: ${version})`);
        }
    }

    // 脅威度スコアを計算
    const threatLevel = calculateThreatLevel(hasControl, numCombining, s.length, looksLikeFileOrURL);

    // 結果表示
    output.innerHTML = `
文字列長: ${s.length}文字
安全性: ${threatLevel <= 3 ? '安全' : threatLevel <= 6 ? '中リスク' : '高リスク'}
脅威度スコア: ${threatLevel}/10
問題のある文字列:
  ${badChars.length ? badChars.join("\n  ") : 'なし'}
ファイル名またはURLに見える: ${looksLikeFileOrURL ? 'はい' : 'いいえ'}
長すぎ: ${isTooLong ? 'はい' : 'いいえ'}
  `;
}