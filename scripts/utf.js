function isCombining(char) {
    const code = char.codePointAt(0);
    return (code >= 0x0300 && code <= 0x036F);
  }

  function analyze() {
    const s = document.getElementById('input').value;
    const output = document.getElementById('output');

    let hasControl = false;
    let hasCombining = false;
    let hasBidi = false;
    let isTooLong = s.length > 5000;
    let badChars = [];

    for (let ch of s) {
      const code = ch.codePointAt(0);
      if (
        (code >= 0x200B && code <= 0x200F) || // ZWSP, LRM, RLM
        (code >= 0x202A && code <= 0x202E)
      ) {
        hasControl = true;
        hasBidi = true;
        badChars.push(`U+${code.toString(16).toUpperCase()} (Bidi/Control)`);
      }
      if (isCombining(ch)) {
        hasCombining = true;
        badChars.push(`U+${code.toString(16).toUpperCase()} (Combining)`);
      }
      if (code === 0xFFFE || code === 0xFFFF) {
        badChars.push(`U+${code.toString(16).toUpperCase()} (Invalid)`);
      }
    }

    const likelyMalicious = isTooLong || hasControl || hasCombining || hasBidi;

    output.innerHTML = `
文字数: ${s.length}
危険度: ${likelyMalicious ? '<span class="danger">高</span>' : '低'}
制御文字: ${hasControl}
双方向制御: ${hasBidi}
結合文字: ${hasCombining}
ファイル名風: ${/\.\w{2,4}\b/.test(s)}
長すぎ: ${isTooLong}
問題文字:
${badChars.length ? badChars.join("\n  ") : 'なし'}
    `;
  }