function isCombining(char) {
    const code = char.codePointAt(0);
    return code >= 0x0300 && code <= 0x036F;
  }

  function isControlCharacter(code) {
    return (
      (code >= 0x200B && code <= 0x200F) ||
      (code >= 0x202A && code <= 0x202E) ||
      code === 0xFFFE || code === 0xFFFF
    );
  }

  function isFileOrURL(s) {
    return /(?:file:\/\/|data:|\.jp[e]?g|\.png|\.gif|\.svg|\.html|\.js|\.exe|\.mp4)/i.test(s);
  }

  function hasRepeatedCharacters(s, threshold = 10) {
    let prev = null, count = 1;
    for (let ch of s) {
      if (ch === prev) {
        count++;
        if (count >= threshold) return true;
      } else {
        prev = ch;
        count = 1;
      }
    }
    return false;
  }

  function hasFrequentCharacters(s, threshold = 10) {
    const counts = {};
    for (let ch of s) counts[ch] = (counts[ch] || 0) + 1;
    const frequent = [];
    for (let ch in counts) {
      if (counts[ch] >= threshold) {
        frequent.push(`${ch} (${counts[ch]}回)`);
      }
    }
    return frequent;
  }

  function analyze() {
    const s = document.getElementById('input').value;
    const output = document.getElementById('output');

    let hasControl = false, hasCombining = false, hasBidi = false;
    const isTooLong = s.length > 5000;
    const hasRepeat = hasRepeatedCharacters(s, 10);
    const frequentChars = hasFrequentCharacters(s, 10);
    const hasFrequentChar = frequentChars.length > 0;
    const looksLikeFileOrURL = isFileOrURL(s);
    const badChars = [];

    for (let ch of s) {
      const code = ch.codePointAt(0);
      if (isControlCharacter(code)) {
        hasControl = true;
        badChars.push(`U+${code.toString(16).toUpperCase()} (制御文字)`);
      }
      if (isCombining(ch)) {
        hasCombining = true;
        badChars.push(`U+${code.toString(16).toUpperCase()} (結合文字)`);
      }
      if (code >= 0x202A && code <= 0x202E) {
        hasBidi = true;
        badChars.push(`U+${code.toString(16).toUpperCase()} (双方向制御文字)`);
      }
    }

    const isUnsafe = isTooLong || hasControl || hasCombining || hasBidi || looksLikeFileOrURL || hasRepeat || hasFrequentChar;

    output.innerHTML = `
<h4 class="danger">あくまでも目安です。</h4>
文字列長: ${s.length}文字
安全性: ${isUnsafe ? '<span class="danger">不安全 (クラッシュや誤作動の可能性)</span>' : '<span class="safe">安全</span>'}

問題のある文字列:
${badChars.length ? badChars.join('\n') : 'なし'}

ファイル名またはURLに見える: ${looksLikeFileOrURL ? 'はい' : 'いいえ'}
同じ文字の連続: ${hasRepeat ? 'はい（悪意の可能性）' : 'いいえ'}
頻出文字（全体で10回以上）: ${hasFrequentChar ? frequentChars.join(', ') : 'なし'}
長すぎ: ${isTooLong ? 'はい' : 'いいえ'}
    `;
  }