function logOutput(title, data) {
    return `\n[${title}]\n${data}\n`;
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    let output = "";
  
    output += logOutput("Navigator",
      `User Agent: ${navigator.userAgent}
  Platform: ${navigator.platform}
  Language: ${navigator.language}
  Languages: ${navigator.languages}
  Cookie Enabled: ${navigator.cookieEnabled}
  Online: ${navigator.onLine}
  Device Memory: ${navigator.deviceMemory} GB
  CPU Threads: ${navigator.hardwareConcurrency}`);
  
    output += logOutput("Screen",
      `Width: ${screen.width}
  Height: ${screen.height}
  Available Width: ${screen.availWidth}
  Available Height: ${screen.availHeight}
  Color Depth: ${screen.colorDepth}
  Pixel Depth: ${screen.pixelDepth}`);
  
    output += logOutput("Location",
      `URL: ${location.href}
  Host: ${location.host}
  Hostname: ${location.hostname}
  Protocol: ${location.protocol}
  Pathname: ${location.pathname}`);
  
    let local = "", session = "";
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      local += `${key}: ${localStorage.getItem(key)}\n`;
    }
    for (let i = 0; i < sessionStorage.length; i++) {
      let key = sessionStorage.key(i);
      session += `${key}: ${sessionStorage.getItem(key)}\n`;
    }
    output += logOutput("LocalStorage", local || "No data");
    output += logOutput("SessionStorage", session || "No data");
  
    output += logOutput("Window / History",
      `History Length: ${history.length}
  Inner Size: ${innerWidth}x${innerHeight}
  Outer Size: ${outerWidth}x${outerHeight}`);
  
    const now = new Date();
    output += logOutput("Time",
      `Timezone Offset: ${now.getTimezoneOffset()} 分
  Local Time: ${now.toLocaleString()}`);
  
    document.getElementById("output").textContent = output;
});
