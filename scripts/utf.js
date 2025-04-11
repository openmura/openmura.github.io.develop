// 結合文字を確認する関数
function isCombining(char) {
    const code = char.codePointAt(0);
    return (code >= 0x0300 && code <= 0x036F);  // 結合文字の範囲
  }

  // 異常Unicodeや制御文字をチェックする関数
  function isControlCharacter(code) {
    return (
      (code >= 0x200B && code <= 0x200F) || // ZWSP, LRM, RLM
      (code >= 0x202A && code <= 0x202E) || // Bidi Control
      (code === 0xFFFE || code === 0xFFFF) // 異常なUnicodeコードポイント
    );
  }

  // ファイル名/URLっぽい文字列をチェック
  function isFileOrURL(s) {
    const regex = /(?:file:\/\/|data:|\.jp[e]?g|\.png|\.gif|\.svg|\.html|\.js|\.exe|\.mp4)/i;
    return regex.test(s);
  }

  // メインの解析関数
  function analyze() {
    const s = document.getElementById('input').value;
    const output = document.getElementById('output');

    let hasControl = false;
    let hasCombining = false;
    let hasBidi = false;
    let isTooLong = s.length > 5000;
    let badChars = [];
    let isUnsafe = false;

    for (let ch of s) {
      const code = ch.codePointAt(0);

      // 制御文字や異常Unicodeを検出
      if (isControlCharacter(code)) {
        hasControl = true;
        badChars.push(`U+${code.toString(16).toUpperCase()} (制御文字)`);
      }

      // 結合文字（Zalgo文字）を検出
      if (isCombining(ch)) {
        hasCombining = true;
        badChars.push(`U+${code.toString(16).toUpperCase()} (結合文字)`);
      }

      // 双方向制御文字
      if (code >= 0x202A && code <= 0x202E) {
        hasBidi = true;
        badChars.push(`U+${code.toString(16).toUpperCase()} (双方向制御文字)`);
      }
    }

    // ファイル名やURLっぽい文字列を検出
    const looksLikeFileOrURL = isFileOrURL(s);

    // 安全性判定
    isUnsafe = isTooLong || hasControl || hasCombining || hasBidi || looksLikeFileOrURL;

    // 結果表示
    output.innerHTML = `
文字列長: ${s.length}文字
安全性: ${isUnsafe ? '<span class="danger">不安全 (クラッシュや誤作動の可能性)</span>' : '<span class="safe">安全</span>'}
問題のある文字列:
${badChars.length ? badChars.join("\n  ") : 'なし'}
ファイル名またはURLに見える: ${looksLikeFileOrURL ? 'はい' : 'いいえ'}
長すぎ: ${isTooLong ? 'はい' : 'いいえ'}
    `;
  }