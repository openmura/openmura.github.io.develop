function updateDateTime() {
    const now = new Date();
    document.getElementById('date').textContent =
      `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;

    document.getElementById('time').textContent =
      `${now.getHours().toString().padStart(2, '0')}:` +
      `${now.getMinutes().toString().padStart(2, '0')}:` +
      `${now.getSeconds().toString().padStart(2, '0')}`;
  }
  setInterval(updateDateTime, 1000);
  updateDateTime();

  function fetchWeather() {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true&timezone=Asia%2FTokyo')
      .then(response => response.json())
      .then(data => {
        if (data && data.current_weather) {
          const temp = data.current_weather.temperature;
          const weatherCode = data.current_weather.weathercode;
          let weatherDesc = ['晴れ', '主に晴れ', '一部曇り', '曇り'][weatherCode] || '不明';
          document.getElementById('weather').textContent = `東京: ${temp}°C ${weatherDesc}`;
        } else {
          document.getElementById('weather').textContent = '天気情報の取得に失敗しました。';
        }
      })
      .catch(() => {
        document.getElementById('weather').textContent = '天気情報の取得にエラーが発生しました。';
      });
  }
  fetchWeather();
  setInterval(fetchWeather, 6000000);

  window.onload = function() {
    setTimeout(() => {
      document.getElementById('loading').classList.add('hidden');
    }, 500);
  };