function isCombining(char) {
  const code = char.codePointAt(0);
  return (code >= 0x0300 && code <= 0x036F);
}

function isControlCharacter(code) {
  return (
    (code >= 0x200B && code <= 0x200F) || // ZWSP, LRM, RLM
    (code >= 0x202A && code <= 0x202E) || // Bidi Control
    (code === 0xFFFE || code === 0xFFFF)
  );
}

function isFileOrURL(s) {
  const regex = /(?:file:\/\/|data:|\.jp[e]?g|\.png|\.gif|\.svg|\.html|\.js|\.exe|\.mp4)/i;
  return regex.test(s);
}

function getSurrogates(cp) {
  if (cp <= 0xFFFF) {
    return [`\\u${cp.toString(16).padStart(4, '0')}`.toUpperCase()];
  }
  const high = Math.floor((cp - 0x10000) / 0x400) + 0xD800;
  const low = ((cp - 0x10000) % 0x400) + 0xDC00;
  return [
    `\\u${high.toString(16).toUpperCase().padStart(4, '0')}`,
    `\\u${low.toString(16).toUpperCase().padStart(4, '0')}`
  ];
}

function analyze() {
  const s = document.getElementById('input').value;
  const output = document.getElementById('output');
  const splitter = new GraphemeSplitter();

  let hasControl = false;
  let hasCombining = false;
  let hasBidi = false;
  let isTooLong = s.length > 5000;
  let badChars = [];
  let isUnsafe = false;

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

  const looksLikeFileOrURL = isFileOrURL(s);
  isUnsafe = isTooLong || hasControl || hasCombining || hasBidi || looksLikeFileOrURL;

  const graphemes = splitter.splitGraphemes(s);
  let detail = '';
  graphemes.forEach((g, i) => {
    detail += `--- グラフェム ${i + 1} ---\n表示: ${g}\n`;
    const parts = g.split('\u200D');  // ZWJで分解
    parts.forEach((part, j) => {
      detail += `  要素 ${j + 1}: ${part}\n`;
      for (let c of Array.from(part)) {
        const cp = c.codePointAt(0);
        const cpHex = cp.toString(16).toUpperCase();
        const surrogates = getSurrogates(cp).join(' ');
        const isVariant = cp >= 0xFE00 && cp <= 0xFE0F;
        const isSkinTone = cp >= 0x1F3FB && cp <= 0x1F3FF;
        detail += `    - ${c} : U+${cpHex} ${surrogates}`;
        if (isVariant) detail += ' (異体字セレクタ)';
        if (isSkinTone) detail += ' (スキントーン)';
        detail += '\n';
      }
    });

    // 正規化バリエーション
    detail += `  正規化:\n`;
    ['NFC', 'NFD', 'NFKC', 'NFKD'].forEach(form => {
      const norm = g.normalize(form);
      const cps = Array.from(norm).map(c => `U+${c.codePointAt(0).toString(16).toUpperCase()}`).join(' ');
      detail += `    ${form}: ${norm} [${cps}]\n`;
    });
  });

  output.innerText = `
文字列長: ${s.length}文字
安全性: ${isUnsafe ? '不安全 (クラッシュや誤作動の可能性)' : '安全'}
問題のある文字:
  ${badChars.length ? badChars.join("\n  ") : 'なし'}
ファイル名またはURLに見える: ${looksLikeFileOrURL ? 'はい' : 'いいえ'}
長すぎ: ${isTooLong ? 'はい' : 'いいえ'}

【詳細解析】
${detail}
  `.
  }